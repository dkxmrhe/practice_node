const router = require('express').Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Client = require('../models/client');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    res.render('main', {title: '메인페이지'});
});

router.get('/mypage/:id', isLoggedIn, (req, res) => {
    res.render('mypage',{title: '마이페이지'});
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {title: '회원가입'});
});
router.get('/getout/:id', isLoggedIn, (req, res) => {
        res.render('getout', {title: '회원 탈퇴'});
});
module.exports = router;