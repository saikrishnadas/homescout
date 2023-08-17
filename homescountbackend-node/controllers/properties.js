import Property from "../models/Property.js";

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
        res.status(200).json(properties);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createProperty = async (req, res) => {
    try {
        const { title, propertyType, rent, buildUpArea, carpetArea, bedrooms, bathrooms, parking, listedBy, bachelorsAllowed, securityDeposit, petAllowed, nonVegetarian, propertyDescription, city, state, country, location } = req.body;
        const newProperty = new Property({
            title,
            propertyType,
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


export const getProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findOne({ _id: id });
        res.status(200).json(property);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const filterProperties = async (req, res) => {
    try {
        const { bedrooms, carpetArea, bathrooms, bachelorsAllowed, parking, petAllowed, city } = req.query;

        // Build the filter object based on provided query parameters
        let filters = {};
        if (bedrooms) {
            filters.bedrooms = bedrooms;
        }
        if (city) {
            filters.city = city;
        }
        if (bathrooms) {
            filters.bathrooms = bathrooms;
        }
        if (parking) {
            filters.parking = parking === 'true'; // Convert the string to a boolean
        }
        if (carpetArea) {
            filters.carpetArea = carpetArea;
        }
        if (bachelorsAllowed) {
            filters.bachelorsAllowed = bachelorsAllowed === 'true'; // Convert the string to a boolean
        }
        if (petAllowed) {
            filters.petAllowed = petAllowed === 'true'; // Convert the string to a boolean
        }

        const filteredProperties = await Property.find(filters)
        res.status(200).json(filteredProperties);
    } catch (error) {
        res.status(404).json({ message: err.message })
    }
}

export const updatePropertyType = async (req, res) => {
    try {
        // Update all documents with the new field and value
        await Property.updateMany({}, { $set: { propertyFor: 'rent' } });

        return res.status(200).json({ message: 'Property fpr updated for all documents.' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating property for.' });
    }
}

export const updateProperty = async (req, res) => {
    try {
        const { title, propertyType, rent, buildUpArea, carpetArea, bedrooms, bathrooms, parking, listedBy, bachelorsAllowed, securityDeposit, petAllowed, nonVegetarian, propertyDescription, city, state, country, location } = req.body;
        const { id } = req.params;
        const updatedProperty = {
            title,
            propertyType,
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
        }
        const updatedData = await Property.findByIdAndUpdate(id, updatedProperty, { new: true })
        res.status(200).json(updatedData)

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating property for.', message: error.message });
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id)
        res.status(200).json({ message: "Property Deleted." })
    } catch {
        return res.status(500).json({ error: 'An error occurred while updating property for.' });
    }
} 