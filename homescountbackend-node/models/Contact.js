import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    allowContact: {
        type: Boolean,
    },
    painting: {
        type: Boolean,
    },
    design: {
        type: Boolean,
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact