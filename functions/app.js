const express = require('express');
const helmet = require('helmet')
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser')();
const httpStatus = require('http-status');
const cors = require('cors')({ origin: true });

const { errorConverter, errorHandler } = require('./middlewares/error');
const authRoutes = require('./routes/auth')

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse Cookies
app.use(cookieParser);

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// handle oauth routes
app.use('login', oauthRoutes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


app.post('/login/oauth/access_token', (req, res) => {
  console.log('access_token');
  const userAccessToken =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ';
  res.send(`access_token=${userAccessToken}&token_type=bearer
  `);
});
app.post('/json', (req, res) => {
  console.log('json post');
  const { header, body, cookies } = req;
  res.status(200).send({ header, body, cookies });
});
app.get('/json', (req, res) => {
  console.log('json get');
  const { header, params, cookies } = req;
  res.status(200).send({ header, params, cookies });
});
app.use(validateFirebaseIdToken);
app.get('/hello', (req, res) => {
  console.log('hello');
  res.send(`Hello ${req.user.name}`);
});
