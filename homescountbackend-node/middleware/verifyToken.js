import jwt from "jsonwebtoken";
import { promisify } from "util"; // Import the promisify function

const verifyJwt = promisify(jwt.verify); // Convert jwt.verify into a promise-based function

export const verifyToken = async (req, res, next) => {
    try {
        let authHeader = req.headers.Authorization || req.headers.authorization; // or req.header("Authorization")

        if (!authHeader?.startsWith('Bearer ')) return res.status(401).send("Unauthorized")
        const token = authHeader.split(" ")[1] //Bearer token

        try {
            // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            //     if (err) return res.status(403).send("Access Denied");
            //     req.user = decoded.email;
            // });
            const decoded = verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) return res.status(401).send("Unauthorized")

            req.user = decoded.email;

            next();
        } catch (err) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).send("Unauthorized");
            } else {
                return res.status(500).json({ error: `JWT ERROR: ${error.message}` });
            }
        }


    } catch (error) {
        res.status(500).json({ error: `JWT ERROR: ${error.message}` })
    }
}