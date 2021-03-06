const User = require('../model/User');
const bcrypt = require('bcrypt');
const getToken = require('../token/token');
const saltRounds = 10;

const handleNewUser = async (req, res) => {
    const { user, email, password } = req.body;
    if (!user || !password || !email) {
        return res.status(400).json({ 'message': 'Email и пароль обязательны для регистрации!'});
    }

    // check for duplicate username in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({ 'message': 'Такой пользователь уже зарегистрирован!'});

    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(password, saltRounds);

        // create and store new user
        const result = await User.create({
            'username': user,
            'email': email,
            'password': hashedPwd
        });

        const accessToken = getToken('access', result, '15m');
        const refreshToken = getToken('refresh', result, '1d');

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 *60 * 1000 });
        // Тут нужно не только юзера создавать, но и его авторизовывать! TODO
        res.status(201).json({
            accessToken,
            user: { name: result.username, email: result.email, },
        });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

// GET ALL USERS
// const handleAllUsers = async (req, res) => {
//     const users = await User.find();
//     if (!users) return res.status(204).json({ message: 'Users not found!' });
//     res.json(users);
// }

module.exports = { handleNewUser };
