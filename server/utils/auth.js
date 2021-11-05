const jwt = require('jsonwebtoken');

const expiresIn = '2h';
module.exports = {
    authMiddleware: function ({ req }) {
        // allows token to be sent via  req.query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        // verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, { expiresIn });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    //Determine what data is being added to token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, process.env.ACCESS_SECRET_TOKEN, { expiresIn });
    },
}