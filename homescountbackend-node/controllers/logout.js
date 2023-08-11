import User from "../models/User.js";

export const handleLogout = async (req, res) => {
    try {
        // on Client, also delete the access token

        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content

        const refreshToken = cookies.jwt;

        //Is refresh token in db?
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        //Delete refresh token in db
        foundUser.refreshToken = '';
        await foundUser.save();

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}