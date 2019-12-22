const Contract = require('../models/contracts');
const Chat = require('../models/chats');
const User = require('../models/users');

exports.getContractList = async (req, res) => {
  const { page } = req.params;
  const pageSize = 10;
  const list = await Contract.find({ isDeleted: false })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return res.status(200).send({
    message: list,
  });
};
exports.getNumContractList = async (req, res) => {
  const num = await Contract.countDocuments({ isDeleted: false });
  res.status(200).send({ message: num });
};

exports.getChat = async (req, res) => {
  const result = await Chat.find({ studentID: req.body.studentID, teacherID: req.body.teacherID });
  const teacherInfo = await User.findById(req.body.teacherID);
  const studentInfo = await User.findById(req.body.studentID);
  return res.status(200).send({ chat: result[0], teacher: teacherInfo, student: studentInfo });
};