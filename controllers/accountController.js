const User = require('../models/users');

exports.getAllUserTeacher = async (req, res) => {
  const { page } = req.params;
  const pageSize = 10;
  const list = await User.find({ type: 'Người dạy' })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return res.status(200).send({
    message: list,
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
  const pageSize = 10;
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
