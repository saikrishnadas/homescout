import Property from "../models/Property.js";

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createProperty = async (req, res) => {
    try {
        const { title, rent, buildUpArea, carpetArea, bedrooms, bathrooms, parking, listedBy, bachelorsAllowed, securityDeposit, petAllowed, nonVegetarian, propertyDescription, city, state, country, location } = req.body;
        const newProperty = new Property({
            title,
            rent,
            buildUpArea,
            carpetArea,
            bedrooms,
            bathrooms,
            parking,
            listedBy,
            bachelorsAllowed,
            securityDeposit,
            petAllowed,
            nonVegetarian,
            propertyDescription,
            city,
            state,
            country,
            location
        })
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}