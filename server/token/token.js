const jwt = require('jsonwebtoken');

const getToken = (token, foundUser, time) => {
    const roles = Object.values(foundUser.roles);
    return (
        jwt.sign(
            {
                'UserInfo': {
                    'username': foundUser.username,
                    'roles': roles
                }
            },
            token === 'access' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: time },
        )
    )
};

module.exports = getToken;
