import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {

        const { firstName, lastName, email, password, phoneNumber, picturePath } = req.body;

        //Check if user exists
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) res.sendStatus(409);

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