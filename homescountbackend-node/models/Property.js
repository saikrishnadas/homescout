import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    propertyType: {
        type: String,
        required: true,
        default: "apartment"
    },
    rent: {
        type: Number,
        required: true,
    },
    buildUpArea: {
        type: Number,
        required: true,
    },
    carpetArea: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        default: 1
    },
    parking: {
        type: Boolean,
        default: false
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing User documents,
        default: null
    },
    propertyOn: {
        type: String,
        default: ""
    },
    listedOn: {
        type: Date,
        default: Date.now
    },
    bachelorsAllowed: {
        type: Boolean,
        default: true
    },
    securityDeposit: {
        type: Number,
        default: 0
    },
    petAllowed: {
        type: Boolean,
        default: false
    },
    nonVegetarian: {
        type: Boolean,
        default: true
    },
    propertyDescription: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
        default: "kerala"
    },
    country: {
        type: String,
        default: "india"
    },
    location: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
export default Property;