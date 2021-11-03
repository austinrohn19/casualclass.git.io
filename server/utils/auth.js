const jwt = require('jsonwebtoken');

module.exports = {
    //Determine what data is being added to token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'});
    },
}