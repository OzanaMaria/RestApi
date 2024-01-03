const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try {
        const [users, _] = await User.findAll();

        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewUser = async (req, res, next) => {
    try {
        console.log(req.body);
        let { email } = req.body;
        let user = new User(email);
        console.log(user);
        user = await user.save();

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}