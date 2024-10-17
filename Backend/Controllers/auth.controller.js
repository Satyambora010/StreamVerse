import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';
import { generateTokenAndSetCookie } from '../Utils/generateToken.js';
export async function signup(req, res) {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        const existing_user_1 = await User.findOne({ email });
        if (existing_user_1) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existing_user_2 = await User.findOne({ userName });
        if (existing_user_2) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const profile_pic = ["https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/avatar1.png", "https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/avatar2.jpg", "https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/avatar3.png"];
        const image = profile_pic[Math.floor(Math.random() * profile_pic.length)];

        const new_user = new User({ userName, email, password: password_hash, image });

        generateTokenAndSetCookie(new_user._id, res);
        await new_user.save();
        
        res.status(201).json({ message: 'User created successfully', user: {...new_user._doc, password: ""} });
    } catch (error) {
        console.log(error);
    }
};

export async function login(req, res) {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const password_match = await bcrypt.compare(password, user.password);
        if (!password_match) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ message: 'User logged in successfully',user: {...user._doc, password: ""} });
    } catch (error) {
        console.log(error);
    }
};

export async function logout(req, res) {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.log(error);
    }
};

export async function authCheck(req, res) {
    try{
        console.log(req.cookies);
        console.log(req.user);
        res.status(200).json({ message: 'User is authenticated', user: req.user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal server error' });
    }
}

export const updateSubscription = async (req, res) => {
    const { userId, subscription } = req.body;

    if (!userId || !subscription) {
        return res.status(400).json({ message: "User ID and subscription are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.subscription = subscription; // Set the subscription to premium
        await user.save();
        res.status(200).json({ message: "Subscription updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};