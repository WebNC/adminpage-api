/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    age: { type: Number },
    sex: { type: String },
    address: { type: String },
    role: { type: String },
    phone: { type: Number },
    url: { type: String },
    passwordHash: { type: String, require: true },
});

UserSchema.methods.setPassword = function (password) {
    this.passwordHash = bcrypt.hashSync(password, saltRounds);
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_KEY);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        role: this.role,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Admin', UserSchema);
