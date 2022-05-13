/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable max-len */
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const cookieParser = require('cookie-parser')();
const puppeteer = require('puppeteer');
const { setResponders } = require('./services/jira.service');
const cors = require('cors')({ origin: true });
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(cors);
app.use(cookieParser);
app.get('/fantasy-callendar/:calendar/epoch_data', async (req, res) => {
  console.log(req.params.calendar);
  const getMoonData = async (moonIndex, page) => {
    const svgSelector = `.current_day>[x-show="day.moons.length > 0"]>[moon="${moonIndex}"]`;
    await page.hover(svgSelector);
    return await page.evaluate((svgSelector) => {
      return {
        desciption: document.querySelector(
          '[x-data="moon_tooltip"]>[x-text="title"]'
        ).innerHTML,
        svg: document.querySelector(svgSelector).outerHTML,
      };
    }, svgSelector);
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://app.fantasy-calendar.com/calendars/b4d8ba8ce6bc923d9080ad0d56ecc723'
  );
  const { static_data, dynamic_data, epoch_data, events } = await page.evaluate(
    () => {
      return {
        static_data,
        dynamic_data,
        epoch_data:
          evaluated_static_data.epoch_data[
            document.querySelector('.current_day').getAttribute('epoch')
          ],
        events,
      };
    }
  );
  const moon_data = await Promise.all(
    static_data.moons.map(async (moon, i) => {
      const scraped_data = await getMoonData(i, page);
      return { ...moon, ...scraped_data };
    })
  );
  const { weather_icon_class } = await page.evaluate(() => {
    return {
      weather_icon_class: document.querySelector(
        '.current_day>.day_row>.weather_popup>i'
      ).classList['value'],
    };
  });
  await browser.close();

  const data = {
    static_data,
    ...dynamic_data,
    ...epoch_data,
    weather: { ...epoch_data.weather, weather_icon_class },
    moons: moon_data,
    timespan: {
      ...static_data.year_data.timespans[dynamic_data.timespan],
      index: dynamic_data.timespan,
    },
    current_era: {
      ...static_data.eras[dynamic_data.current_era],
      index: dynamic_data.current_era,
    },
    events: events.filter(
      (event) =>
        event.data.date[0] === dynamic_data.year &&
        event.data.date[1] === dynamic_data.timespan &&
        event.data.date[2] === dynamic_data.day
    ),
  };
  res.status(200).send(data);
});
app.post('/login/oauth/access_token', (req, res) => {
  console.log('access_token');
  const userAccessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ';
  res.send(`access_token=${userAccessToken}&token_type=bearer
  `);
});
app.post('/jira/setResponders', (req, res) => {
  setResponders(req.body.issue.id)
    .then(() => {
      res.status(200).send({ message: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).send({ message: 'error', error });
    });
});
app.post('/json', (req, res) => {
  console.log('json post');
  const { header, body, cookies } = req;
  console.log(JSON.stringify(body));
  res.status(200).send({ header, body, cookies });
});
app.get('/json', (req, res) => {
  console.log('json get');
  const { header, params, cookies } = req;
  console.log(JSON.stringify(params));
  res.status(200).send({ header, params, cookies });
});
app.use(validateFirebaseIdToken);
app.get('/hello', (req, res) => {
  console.log('hello');
  res.send(`Hello ${req.user.name}`);
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
  .https.onRequest(app);

exports.hello = functions.https.onRequest((res) => {
  res.send('hello world');
});
