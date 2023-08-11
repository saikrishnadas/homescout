import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let authHeader = req.header.Authorization || req.header.authorization; // or req.header("Authorization")

        if (!authHeader?.startsWith('Bearer ')) return res.status(401).send("Unauthorized")

        const token = authHeader.split(" ")[1] //Bearer token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).send("Access Denied");
            req.user = decoded.email;
        });

        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}