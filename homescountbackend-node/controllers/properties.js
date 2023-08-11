import Property from "../models/Property.js";

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.send(200).json(properties);
    } catch (err) {
        res.send(404).json({ message: err.message })
    }
}