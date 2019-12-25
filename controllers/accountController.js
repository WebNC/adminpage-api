/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const User = require('../models/users');
const Admin = require('../models/admins');
const Skill = require('../models/skills');

exports.getAllUserTeacher = async (req, res) => {
  const { page } = req.params;
  const pageSize = 7;
  const teachers = await User.find({ type: 'Người dạy' })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const skillL = await Skill.find();
  const teacherList = teachers.map((eleme) => {
    const skills = eleme.skill.map((element) => {
      const ele = skillL.find((elem) => String(elem._id) === String(element));
      return { id: ele._id, name: ele.name };
    });
    eleme.skill = skills;
    return eleme;
  });
  return res.status(200).send({
    message: teacherList,
  });
};

exports.getNumberUserTeacher = async (req, res) => {
  const num = await User.countDocuments({ type: 'Người dạy' });
  return res.status(200).send({
    message: num,
  });
};

exports.getAllUserStudent = async (req, res) => {
  const { page } = req.params;
  const pageSize = 7;
  const list = await User.find({ type: 'Người học' })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return res.status(200).send({
    message: list,
  });
};

exports.getNumberUserStudent = async (req, res) => {
  const num = await User.countDocuments({ type: 'Người học' });
  return res.status(200).send({
    message: num,
  });
};

exports.getUserDetail = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).send({
    message: user,
  });
};

exports.blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = true;
    await user.save();
    res.status(200).send({
      message: 'DOne',
    });
  } else {
    res.status(500).send({
      message: "Can't find user",
    });
  }
  return res;
};

exports.unblockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = false;
    await user.save();
    res.status(200).send({
      message: 'DOne',
    });
  } else {
    res.status(500).send({
      message: "Can't find user",
    });
  }
  return res;
};


exports.edit = async (req, res) => {
  const { id } = req.body;
  Admin.findOne({ _id: id })
    .then(async (user) => {
      if (!user) {
        res.status(400).send({
          message: 'No user',
        });
      } else {
        user.username = req.body.username;
        user.address = req.body.address;
        user.age = req.body.age;
        user.phone = req.body.phone;
        await user.save();
        res.status(200).send({
          user,
        });
      }
    });
  return res;
};

exports.changePass = (req, res) => {
  const { id } = req.body;
  return Admin.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      const passHash = user.setPassword(req.body.password);
      user.passwordHash = passHash || user.passwordHash;
      user.save();
      return res.send(user);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while update the User.',
      });
    });
};
