const jwt = require('jsonwebtoken');

const secret = 'testsecret'

module.exports = {
    authMiddleware: function ({ req }) {

        let token = req.headers.authorization || req.body.token || req.query.token

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, {maxAge: '2h' });
            req.user = data
            return req
        } catch (error) {
            console.log(error)
        }
    },
    //Determine what data is being added to token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: '2h'});
    },
}