const JWT = require('jsonwebtoken');
const secret = "@pvg123Tejas#admin10";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateTokenForUser(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}
    
module.exports = {
    validateTokenForUser,
    createTokenForUser,
};