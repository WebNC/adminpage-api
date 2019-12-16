const Report = require('../models/reports');

exports.getReportList = async (req, res) => {
  const { page } = req.params;
  const pageSize = 5;
  const list = await Report.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return res.status(200).send({
    message: list,
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
