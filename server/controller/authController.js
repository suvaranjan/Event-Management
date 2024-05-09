const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { username, email, password, avatar } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatar,
        });

        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Wrong password" });
        }

        await user.save();

        // Generate JWT token
        const payload = {
            _id: user._id,
            email: user.email
        };

        const options = {
            expiresIn: '24h'
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        const userInfo = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        };

        // Send token and success message and userInfo
        return res.status(200).json({ token, userInfo, msg: "Login successful" });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ msg: "Server Error" });
    }
};


const logout = (req, res) => {
    res.status(200).json({ msg: "Logout User" })
};


module.exports = {
    register,
    login,
    logout,
};