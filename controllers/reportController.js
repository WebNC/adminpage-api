/* eslint-disable no-underscore-dangle */
const Report = require('../models/reports');
const User = require('../models/users');
const Contract = require('../models/contracts');
const Chat = require('../models/chats');
const Skill = require('../models/skills');

exports.getReportList = async (req, res) => {
  const { page } = req.params;
  const pageSize = 5;
  const list = await Report.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const user = await User.find();
  const report = list.map((ele) => {
    const teacher = user.find((elem) => String(elem._id) === String(ele.teacherID));
    const student = user.find((elem) => String(elem._id) === String(ele.studentID));
    const copy = {
      ...ele.toObject(),
      teacherName: teacher.username,
      studentName: student.username,
    };
    return copy;
  });
  return res.status(200).send({
    message: report,
  });
};
exports.getNumContractList = async (req, res) => {
  const num = await Report.countDocuments();
  res.status(200).send({ message: num });
};
exports.solveReport = async (req, res) => {
  const { id, type } = req.body;
  const report = await Report.findById(id);
  report.status = true;
  await report.save();
  const contract = await Contract.findOne({ contractID: report.contractID });
  if (type === true) {
    contract.status = 'Đã hoàn tiền';
  } else {
    contract.status = 'Đã hoàn thành';
  }
  await contract.save();
  res.status(200).send({ message: 'Done' });
};
exports.getChat = async (req, res) => {
  const result = await Chat.find({ studentID: req.body.studentID, teacherID: req.body.teacherID });
  const teacherInfo = await User.findById(req.body.teacherID);
  const studentInfo = await User.findById(req.body.studentID);
  const contracts = await Contract.findOne({
    teacherID: req.body.teacherID,
    studentID: req.body.studentID,
  });
  const skills = await Skill.find();
  const contractList = contracts.skill.map((ele) => {
    const elem = skills.find((element) => String(element._id) === String(ele));
    return elem;
  });
  contracts.skill = contractList;
  return res.status(200).send({
    chat: result[0],
    teacher: teacherInfo,
    student: studentInfo,
    contract: contracts,
  });
};
