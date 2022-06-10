const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 'message': 'Email and password are required!'});
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ 'message': 'User not found!'});
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWT
        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'username': foundUser.username,
                    'roles': roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refresh token with current user
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 *60 * 1000 });
        res.json({ accessToken });
    } else {
        res.status(401).json({ 'message': 'Password not accept!'});
    }
}

module.exports = { handleLogin };
