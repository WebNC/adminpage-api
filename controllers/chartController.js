/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const moment = require('moment');
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
const dataMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
exports.getIncomeDataMonth = async (req, res) => {
  const { date } = req.body;
  const monthDay = new Date(date);
  const month = monthDay.getMonth();
  const data = [];
  for (let k = 0; k < dataMonth[month]; k += 1) {
    data.push({ month: monthDay.getTime() + (86400000 * k), income: 0 });
  }
  if (dataMonth[month] === 30) {
    data.push({ month: monthDay.getTime() + (86400000 * 29), income: 0 });
  } else if (dataMonth[month] === 29) {
    data.push({ month: monthDay.getTime() + (86400000 * 28), income: 0 });
  }
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const dataList = data.map((ele) => {
    const elem = contractList.find((element) => moment(element.payDate).format('MMM DD YY') === moment(ele.month).format('MMM DD YY'));
    ele.month = moment(ele.month).format('DD/MM');
    if (elem) {
      ele.income += (elem.value / 1000000);
    }
    return ele;
  });
  res.status(200).send({ data: dataList });
};

exports.getIncomeDataRange = async (req, res) => {
  const { date } = req.body;
  const fromDate = new Date(date[0]).getTime();
  const toDate = new Date(date[1]).getTime();
  let k = 0;
  const data = [];
  let dateRun = fromDate;
  while (dateRun <= toDate) {
    data.push({ month: dateRun, income: 0 });
    k += 1;
    dateRun = fromDate + (86400000 * k);
  }
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const dataList = data.map((ele) => {
    const elem = contractList.find((element) => moment(element.payDate).format('MMM DD YY') === moment(ele.month).format('MMM DD YY'));
    ele.month = moment(ele.month).format('DD/MM');
    if (elem) {
      ele.income += (elem.value / 1000000);
    }
    return ele;
  });
  res.status(200).send({ data: dataList });
};
