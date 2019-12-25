/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const Contract = require('../models/contracts');

const Filter = (list, filters) => {
  const result = list.filter((ele) => {
    return (filters.createAt && filters.createAt.length !== 0 ? filters.createAt.includes(moment(ele.createAt).format('DD/MM/YYYY')) : true)
    && (filters.status && filters.status.length !== 0 ? filters.status.includes(ele.status) : true);
  });
  return result;
};
const Sort = (list, type, order) => {
  const result = list.sort((a, b) => {
    if (order === 'ascend') {
      return a[type] - b[type];
    }
    return b[type] - a[type];
  });
  return result;
};

exports.getContractList = async (req, res) => {
  const {
    page,
    pageSize,
    filters,
    sorter,
  } = req.body;
  const skip = (page - 1) * pageSize;
  let list = await Contract.find({ isDeleted: false });
  const createDate = list.map((ele) => moment(ele.createAt).format('DD/MM/YYYY'));
  const statusL = list.map((ele) => ele.status);
  const createFilter = [...new Set(createDate)];

  list = Sort(list, 'createAt', 'descend');

  // create filter
  const create = createFilter.map((ele) => {
    return { text: ele, value: ele };
  });
  const statusFilter = [...new Set(statusL)];
  const status = statusFilter.map((ele) => {
    return { text: ele, value: ele };
  });
  let result = list;
  if (filters !== {}) {
    result = Filter(list, filters);
  }
  if (sorter) {
    result = Sort(result, sorter.field, sorter.order);
  }
  // get page
  const contractList = result.slice(skip, skip + pageSize);
  return res.status(200).send({
    message: contractList,
    filterCreate: create,
    filterStatus: status,
    total: result.length,
  });
};
exports.getNumContractList = async (req, res) => {
  const num = await Contract.countDocuments({ isDeleted: false });
  res.status(200).send({ message: num });
};
