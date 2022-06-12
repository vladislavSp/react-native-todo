const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getToken = require('../token/token');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 'message': 'Email and password are required!'});
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ 'message': 'Пользователь не найден!' });
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWT
        const accessToken = getToken('access', foundUser, '1h');
        const refreshToken = getToken('refresh', foundUser, '1d');

        // Saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 *60 * 1000 });
        res.json({
            accessToken,
            user: {
                name: foundUser.username,
                email: foundUser.email,
            },
        });
    } else {
        res.status(401).json({ 'message': 'Неправильный пароль!'});
    }
}

module.exports = { handleLogin };
