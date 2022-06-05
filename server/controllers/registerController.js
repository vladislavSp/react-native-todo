const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ 'message': 'User name and password are required.'});
    }

    // check for duplicate username in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({ 'message': 'This user is already exist!'});

    try {
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // create and store new user
        const result = await User.create({
            'username': user,
            'password': hashedPassword
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!`});
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
