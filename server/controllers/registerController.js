const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ 'message': 'User name and password are required.'});
    }
    // check for duplicate username in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.status(409).json({ 'message': 'This user is already exist!'});

    try {
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // store new user
        const newUser = { 'username': user, 'password': hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.status(201).json({ 'success': `New user ${user} created!`});
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewUser };
