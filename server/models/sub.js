const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
        minlength: [2, 'too short'],
        maxlength: [32, 'too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true

    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('SubCategory', categorySchema)

