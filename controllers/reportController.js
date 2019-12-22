/* eslint-disable no-underscore-dangle */
const Report = require('../models/reports');
const User = require('../models/users');
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
  const { id } = req.body;
  const report = await Report.findById(id);
  report.status = true;
  await report.save();
  res.status(200).send({ message: 'Done' });
};
