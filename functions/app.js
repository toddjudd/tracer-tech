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

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });

admin.initializeApp();
const api = express();
api.use(cors);
api.use(cookieParser);
api.post('/login/oauth/access_token', (req, res) => {
  const userAccessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ';
  res.send(`access_token=${userAccessToken}&token_type=bearer`);
});
api.post('/json', (req, res) => {
  const { header, body, cookies } = req;
  res.status(200).send({ header, body, cookies });
});
api.get('/json', (req, res) => {
  const { header, params, cookies } = req;
  res.status(200).send({ header, params, cookies });
});
// api.use(validateFirebaseIdToken);
api.get('/hello', (req, res) => {
  res.send(`Hello ${req.user.name}`);
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(api);
