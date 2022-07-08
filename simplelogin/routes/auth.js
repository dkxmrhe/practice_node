const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Client = require('../models/client');

router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const { user_id, password } = req.body;
    try {
        const exUser = await Client.findOne({ where: { user_id }});
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await Client.create({
            user_id,
            password: hash,
        });
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) (req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err);
    });
    res.redirect('/');
});

router.post('/change/:id', async(req, res, next) => {
    const password = req.body.password;
    try{
        const hash = await bcrypt.hash(password, 12);
        await Client.update({ password: hash }, {
            where: {
                user_id: req.params.id,
            }
        });
        req.logout((err) => {
            if(err) return next(err);
        });
        return res.redirect(303, '/');
    } catch(err){
        console.error(err);
        return next(err);
    }
});

router.post('/out/:id', async(req, res, next) => {
    try{
        await Client.destroy({
        where: {
            user_id: req.params.id,
        }
    });
    res.redirect(303, '/');
    } catch(err) {
        console.error(err); return next(err);
    }
});

module.exports = router;