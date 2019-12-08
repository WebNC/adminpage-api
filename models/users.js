/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    birthday: { type: String },
    major: { type: String },
    skill: { type: Array },
    intro: { type: String },
    sex: { type: String },
    address: { type: Array },
    degree: { type: String },
    phone: { type: String },
    url: { type: String },
    type: { type: String, required: true },
    passwordHash: { type: String, require: true },
    googleId: { type: String },
    facebookId: { type: String },
    isBlocked: { type: Boolean, default: false },
});
module.exports = mongoose.model('User', UserSchema);
