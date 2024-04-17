const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const QUERY_CTRL = require("./query.controller")

const queryCtrl = new QUERY_CTRL();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let userCtrl = {}
// Create and Save a new User
userCtrl.create = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("reqBody : ", reqBody)
        await queryCtrl.insertIntoTable(reqBody);
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error processing the Create and Save a new User');
    }
};

// Check User authorization
userCtrl.auth_login = async (req, res) => {
    console.log("oooooooooooooooooooooooooooooooooooooo : Check User authorization");
    try {
        const { username, password } = req.body;

        const user = await queryCtrl.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // Check if the password matches the one stored in the database
        if (password !== user.password) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        // Send the JWT token back to the client
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error processing the login');
    }
};

userCtrl.all_user = async (req, res) => {
    try{
        userDetails = await queryCtrl.getAllUsers()
        return res.status(200).json({ message: 'Protected route accessed successfully', userList : userDetails });
    }catch(error){
        console.log(error);
        res.status(500).send('Error getting the user data');
    }
}

module.exports = userCtrl;