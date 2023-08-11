import Property from "../models/Property.js";

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}