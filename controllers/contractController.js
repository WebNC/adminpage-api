const Contract = require('../models/contracts');

exports.getContractList = async (req, res) => {
  const { page } = req.params;
  const pageSize = 25;
  const list = await Contract.find({ isDeleted: false })
    .skip(page * pageSize)
    .limit(pageSize);
  return res.status(200).send({
    message: list,
  });
};
exports.getNumContractList = async (req, res) => {
  const num = await Contract.countDocuments({ isDeleted: false });
  res.status(200).send({ message: num });
};