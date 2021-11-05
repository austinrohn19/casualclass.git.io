const jwt = require('jsonwebtoken');

const { User } = require('../models/')

const expiresIn = '2h';
module.exports = {
    authMiddleware: async function ({ req }) {
        // allows token to be sent via  req.query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        } else {
            // verify token and get user data out of it
            try {
                const { data } = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, { expiresIn });
                req.user = await User.findById(data._id);
                return req
            } catch {
                console.log('Invalid token');
            }
        }


    },
    //Determine what data is being added to token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, process.env.ACCESS_SECRET_TOKEN, { expiresIn });
    },
}