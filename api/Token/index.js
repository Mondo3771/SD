const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        context.res = {
            status: 401,
            body: "No token provided"
        };
        return;
    }

    jwt.verify(token, 'YOUR_AUTH0_SECRET', (err, user) => {
        if (err) {
            context.res = {
                status: 403,
                body: "Invalid token"
            };
            return;
        }

        req.user = user;
    });

    // Continue processing the request...
};