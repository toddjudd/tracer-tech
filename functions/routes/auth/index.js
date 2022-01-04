const express = require('express');
const oauthRoute = require('./oauth.route');
const config = require('../../config/config');

const router = express.Router();

const loginRoutes = [
  {
    path: '/oauth',
    route: oauthRoute,
  },
];

loginRoutes.forEach((route) => {
  router.use(path.join('/login', route.path), route.route);
});

module.exports = router;
