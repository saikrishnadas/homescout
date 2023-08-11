import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401)

        const refreshToken = cookies.jwt;

        const foundUser = await User.findOne({ refreshToken }).exec();

        if (!foundUser) return res.sendStatus(403) //forbidden

        jwt.verify(refreshToken, process.env.REFERSH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            res.json({ accessToken });
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}