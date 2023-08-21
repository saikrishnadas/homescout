import Contact from "../models/Contact.js";

export const getContact = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, allowContact, painting, desgin } = req.body;
        const newContact = new Contact({
            fullName, email, phoneNumber, allowContact, painting, desgin
        })
        await newContact.save();
        res.status(201).json("Success")
    } catch (error) {
        return res.status(500).json({ error: `An error occurred - ${error}` });
    }
}