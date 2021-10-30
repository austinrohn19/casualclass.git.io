const jwt = require('jsonwebtoken');
require('dotenv').config;

module.exports = {
    //Determine what data is being added to token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '2h'});
    },
}