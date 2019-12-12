const Skill = require('../models/skills');
const User = require('../models/users');

exports.getSkill = async (req, res) => {
  const { page } = req.params;
  const pageSize = 25;
  const skill = await Skill.find({ isDeleted: false })
    .skip(page * pageSize)
    .limit(pageSize);
  const user = await User.find({ isBlocked: false, type: 'Người dạy' });
  const s = {};
  skill.forEach((ele) => {
    s[ele.id] = { name: ele.name, number: 0 };
  });
  user.forEach((ele) => {
    ele.skill.forEach((element) => {
      if (s[element]) {
        s[element].number += 1;
      }
    });
  });
  return res.status(200).send({
    skillList: skill,
    number: s,
  });
};
exports.getNumberSkill = async (req, res) => {
  const num = await Skill.countDocuments({ isDeleted: false });
  return res.status(200).send({
    message: num,
  });
};
exports.createSkill = async (req, res) => {
  const { value } = req.body;
  const result = await Skill.findOne({ name: value });
  if (result) {
    res.status(400).send({
      message: 'Skill đã tồn tại',
    });
  } else {
    const skill = new Skill({
      name: value,
    });
    await skill.save();
    res.status(200).send({
      message: 'Done',
      value: skill,
    });
  }
  return res;
};
exports.updateSkill = async (req, res) => {
  const { id, value } = req.body;
  const skill = await Skill.findById(id);
  if (skill) {
    skill.name = value;
    await skill.save();
    res.status(200).send({
      message: 'Done',
    });
  } else {
    res.status(500).send({
      message: "Can't find skill",
    });
  }
  return res;
};
exports.deleteSkill = async (req, res) => {
  const { id } = req.body;
  const skill = await Skill.findById(id);
  if (skill) {
    skill.isDeleted = true;
    await skill.save();
    res.status(200).send({
      message: 'Done',
      value: skill,
    });
  } else {
    res.status(500).send({
      message: "Can't find skill",
    });
  }
  return res;
};
