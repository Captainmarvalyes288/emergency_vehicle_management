const { validateTokenForUser } = require("../server/auth");

function checkForAuthCookie(cookie) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookie];
        if (!tokenCookie) {
            return next();
        }
        try {
            const userPayload = validateTokenForUser(tokenCookie);
            req.user = userPayload;
        } catch (error) {
            console.error('Authentication error:', error.message);
            return res.status(401).send('Unauthorized');
        }
        return next();
    }
}

module.exports = {
    checkForAuthCookie,
};
