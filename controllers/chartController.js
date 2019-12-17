/* eslint-disable import/prefer-default-export */
const Contract = require('../models/contracts');

export const dataChart = async (req, res) => {
  const data = [];
  for (let i = 0; i < 12; i += 1) {
    data.push({ month: `Tháng ${i}`, income: 0 });
  }
  const contract = await Contract.find({ statusPay: true });
  contract.forEach((ele) => {
    if (ele.payDate.getYear() === 2019) {
      data[ele.payDate.getMonth] += ele.income;
    }
  });
  res.status(200).send({ message: data });
};
