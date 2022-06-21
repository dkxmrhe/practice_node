const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/', (req, res, next) => {
    res.render('main');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/join', (req, res, next) => {
    res.render('join');
});
router.get('/prof', (req, res, next) => {
    res.render('/profile');
});
module.exports = router;