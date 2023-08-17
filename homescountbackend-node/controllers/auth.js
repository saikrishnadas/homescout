import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

        const { firstName, lastName, email, password, phoneNumber, picturePath } = req.body;

        //Check if user exists
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) return res.sendStatus(409);

        //Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            picturePath,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        await newUser.save();
        res.status(201).json({ message: `User with email ${email} is created` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).exec();
        if (!user) return res.status(400).json({ message: `User ${email} doesn't exists` });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ email: user.email }, process.env.REFERSH_TOKEN_SECRET, { expiresIn: '1d' });

        // Save the refresh token with the current user
        user.refreshToken = refreshToken;
        const savedUser = await user.save();

        //While sending to frontend remove the password field
        const userWithoutPassword = { ...savedUser.toObject(), password: undefined, refreshToken: undefined };

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 }) //max age here is 1 day
        res.status(200).json({ accessToken, user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const getUserInfo = async (req, res) => {
    try {
        const { email } = req.params;
        const userInfo = await User.findOne({ email: email }).exec();
        res.status(200).json(userInfo);
    } catch {
        res.status(500).json({ error: error.message })
    }
}