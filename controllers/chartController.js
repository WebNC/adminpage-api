/* eslint-disable import/prefer-default-export */
const Contract = require('../models/contracts');

exports.getIncomeData = async (req, res) => {
  const data = [];
  for (let i = 0; i < 12; i += 1) {
    data.push({ month: `Tháng ${i + 1}`, income: 0 });
  }
  const date = new Date();
  const contract = await Contract.find({ status: 'Đã hoàn thành' });
  contract.forEach((ele) => {
    if (ele.payDate.getYear() === date.getYear()) {
      data[ele.payDate.getMonth()].income += (ele.value / 1000000);
    }
  });
  res.status(200).send({ data });
};

exports.getIncomeDataMonth = async (req, res) => {
  const data = [];
  for (let i = 0; i < 12; i += 1) {
    data.push({ month: `Tháng ${i + 1}`, income: 0 });
  }
  const date = new Date();
  const contract = await Contract.find({ status: 'Đã hoàn thành' });
  contract.forEach((ele) => {
    if (ele.payDate.getYear() === date.getYear()) {
      data[ele.payDate.getMonth()].income += (ele.value / 1000000);
    }
  });
  res.status(200).send({ data });
};

exports.getIncomeDataRange = async (req, res) => {
  const data = [];
  for (let i = 0; i < 12; i += 1) {
    data.push({ month: `Tháng ${i + 1}`, income: 0 });
  }
  const date = new Date();
  const contract = await Contract.find({ status: 'Đã hoàn thành' });
  contract.forEach((ele) => {
    if (ele.payDate.getYear() === date.getYear()) {
      data[ele.payDate.getMonth()].income += (ele.value / 1000000);
    }
  });
  res.status(200).send({ data });
};
