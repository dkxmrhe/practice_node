const passport = require('passport');
const local = require('./localStrategy');
const Client = require('../models/client');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) => {
        Client.findOne({ where: { user_id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
}