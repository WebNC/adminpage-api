/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const SkillSchema = new Schema({
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Skill', SkillSchema);
