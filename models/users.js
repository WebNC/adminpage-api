/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    birthday: { type: String },
    major: { type: String },
    skill: { type: Array },
    intro: { type: String },
    sex: { type: String },
    address: { type: Object },
    degree: { type: String },
    phone: { type: String },
    url: { type: String },
    type: { type: String, required: true },
    price: { type: Number },
    successRatio: { type: Number },
    rating: { type: Number },
    history: { type: Array },
    income: { type: Number },
    passwordHash: { type: String, require: true },
    googleId: { type: String },
    facebookId: { type: String },
    isBlocked: { type: Boolean, default: false },
    isActived: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
