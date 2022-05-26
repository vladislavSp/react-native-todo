const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ 'message': 'User name and password are required!'});
    }

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(404).json({ 'message': 'User not found!'});
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWT
        res.json({ 'success': `User ${user} logged in!`})
    } else {
        res.status(404).json({ 'message': 'Password not accept!'});
    }
}

module.exports = { handleLogin };
