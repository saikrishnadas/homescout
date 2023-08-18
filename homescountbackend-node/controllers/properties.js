import Property from "../models/Property.js";

// Sort options mapping
const sortOptions = {
    relevance: 'id', // No sorting (same as old data)
    recent: 'createdAt', // Posted on recent first
    old: 'createdAt',    // Posted on old first
    priceHighToLow: 'rent', // Price high to low
    priceLowToHigh: 'rent', // Price low to high
};

export const getAllProperties = async (req, res) => {
    try {
        // const properties = await Property.find().populate('listedBy')
        const properties = await Property.find();
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
        const { bedrooms, carpetArea, bathrooms, bachelorsAllowed, parking, petAllowed, city, title, type } = req.query;

        // Build the filter object based on provided query parameters
        let filters = {};
        if (type && type !== 'null' && type !== null) {
            filters.type = type;
        }
        if (bedrooms && bedrooms !== '0' && bedrooms !== 0) {
            filters.bedrooms = bedrooms;
        }
        if (title) {
            filters.title = title;
        }
        if (city) {
            filters.city = city;
        }
        if (bathrooms && bathrooms !== '0' && bathrooms !== 0) {
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
        // console.log(filters)
        const filteredProperties = await Property.find(filters)
        // console.log(filteredProperties)
        res.status(200).json(filteredProperties);
    } catch (error) {
        res.status(404).json({ message: err.message })
    }
}

export const sortProperties = async (req, res) => {
    try {
        const { sortOption } = req.body;

        const data = await Property.find().exec();

        if (!sortOption || !sortOptions.hasOwnProperty(sortOption)) {
            return res.status(400).json({ error: 'Invalid sort option' });
        }

        const sortBy = sortOptions[sortOption];

        // Clone the data array to avoid mutating the original data
        const sortedData = [...data]

        if (sortOption === 'relevance') {
            // No sorting needed
        } else if (sortOption === 'recent') {
            sortedData.sort((a, b) => b[sortBy] - a[sortBy]);
        } else if (sortOption === 'old') {
            sortedData.sort((a, b) => a[sortBy] - b[sortBy]);
        } else if (sortOption === 'priceHighToLow') {
            sortedData.sort((a, b) => b[sortBy] - a[sortBy]);
        } else {
            sortedData.sort((a, b) => a[sortBy] - b[sortBy]);
        }
        res.status(200).json(sortedData);

    } catch {
        return res.status(500).json({ error: 'An error occurred while updating property for.' });
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

export const getPropertiesByUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const properties = await Property.find({ listedBy: userId });
        res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating property for.' });
    }
}