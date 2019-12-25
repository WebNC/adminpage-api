/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const Contract = require('../models/contracts');
const Teacher = require('../models/users');
const Skill = require('../models/skills');


const compareIncome = (a, b) => {
  return parseInt(a.income, 10) > parseInt(b.income, 10);
};

exports.getTopTeacherIncome = async (req, res) => {
  const teacherList = await Teacher.find({ type: 'Người dạy' });
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const teachers = teacherList.map((ele) => {
    return { id: ele._id, name: ele.username, income: 0 };
  });
  contractList.map((ele) => {
    const index = teachers.findIndex((element) => {
      return String(ele.teacherID) === String(element.id);
    });
    teachers[index].income += ele.value;
    return ele;
  });
  teachers.sort(compareIncome);
  console.log(teachers);

  const data = teachers.slice(0, 10);
  return res.status(200).send({
    message: data,
  });
};
exports.getTopTeacherIncomeDay = async (req, res) => {
  const { date } = req.body;
  const day = new Date(date);
  const nextDay = new Date(day.getTime() + 86400000);
  const teacherList = await Teacher.find({ type: 'Người dạy' });
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const teachers = teacherList.map((ele) => {
    return { id: ele._id, name: ele.username, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate >= day && ele.payDate <= nextDay) {
      const index = teachers.findIndex((element) => {
        return String(ele.teacherID) === String(element.id);
      });
      teachers[index].income += ele.value;
    }
    return ele;
  });
  teachers.sort(compareIncome);
  const data = teachers.slice(0, 10);
  return res.status(200).send({
    message: data,
  });
};
exports.getTopTeacherIncomeRange = async (req, res) => {
  const { date } = req.body;
  const fromDay = new Date(date[0]);
  const toDay = new Date(date[1]);
  const toNextDay = new Date(toDay.getTime() + 86400000);
  const teacherList = await Teacher.find({ type: 'Người dạy' });
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const teachers = teacherList.map((ele) => {
    return { id: ele._id, name: ele.username, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate >= fromDay && ele.payDate <= toNextDay) {
      const index = teachers.findIndex((element) => {
        return String(ele.teacherID) === String(element.id);
      });
      teachers[index].income += ele.value;
    }
    return ele;
  });
  teachers.sort(compareIncome);
  const data = teachers.slice(0, 10);
  return res.status(200).send({
    message: data,
  });
};
exports.getTopTeacherIncomeMonth = async (req, res) => {
  const { date } = req.body;
  const day = new Date(date);
  const teacherList = await Teacher.find({ type: 'Người dạy' });
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const teachers = teacherList.map((ele) => {
    return { id: ele._id, name: ele.username, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate.getMonth() === day.getMonth() && ele.payDate.getFullYear() === day.getFullYear()) {
      const index = teachers.findIndex((element) => {
        return String(ele.teacherID) === String(element.id);
      });
      teachers[index].income += ele.value;
    }
    return ele;
  });
  teachers.sort(compareIncome);
  const data = teachers.slice(0, 10);
  return res.status(200).send({
    message: data,
  });
};

exports.getTopSkillIncome = async (req, res) => {
  const skillList = await Skill.find();
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const skills = skillList.map((ele) => {
    return { id: ele._id, name: ele.name, income: 0 };
  });
  contractList.map((ele) => {
    ele.skill.forEach((elem) => {
      const index = skills.findIndex((element) => {
        return String(elem) === String(element.id);
      });
      skills[index].income += ele.value;
    });
    return ele;
  });
  skills.sort(compareIncome);
  const data = skills.slice(skills.length - 10, skills.length);
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(data[10 - i - 1]);
  }
  // console.log(result);

  return res.status(200).send({
    // message: data,
    message: result,

  });
};
exports.getTopSkillIncomeDay = async (req, res) => {
  const { date } = req.body;
  const day = new Date(date);
  const nextDay = new Date(day.getTime() + 86400000);
  const skillList = await Skill.find();
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const skills = skillList.map((ele) => {
    return { id: ele._id, name: ele.name, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate >= day && ele.payDate <= nextDay) {
      ele.skill.forEach((elem) => {
        const index = skills.findIndex((element) => {
          return String(elem) === String(element.id);
        });
        skills[index].income += ele.value;
      });
    }
    return ele;
  });
  skills.sort(compareIncome);
  const data = skills.slice(skills.length - 10, skills.length);
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(data[10 - i - 1]);
  }
  return res.status(200).send({
    message: result,
  });
};
exports.getTopSkillIncomeMonth = async (req, res) => {
  const { date } = req.body;
  const day = new Date(date);
  const skillList = await Skill.find();
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const skills = skillList.map((ele) => {
    return { id: ele._id, name: ele.name, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate.getMonth() === day.getMonth() && ele.payDate.getFullYear() === day.getFullYear()) {
      ele.skill.forEach((elem) => {
        const index = skills.findIndex((element) => {
          return String(elem) === String(element.id);
        });
        skills[index].income += ele.value;
      });
    }
    return ele;
  });
  skills.sort(compareIncome);

  const data = skills.slice(skills.length - 10, skills.length);
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(data[10 - i - 1]);
  }
  return res.status(200).send({
    message: result,
  });
};
exports.getTopSkillIncomeRange = async (req, res) => {
  const { date } = req.body;
  const fromDay = new Date(date[0]);
  const toDay = new Date(date[1]);
  const toNextDay = new Date(toDay.getTime() + 86400000);
  const skillList = await Skill.find();
  const contractList = await Contract.find({
    $or: [{ status: 'Đã hoàn thành' }, { status: 'Đang giải quyết' }],
  });
  const skills = skillList.map((ele) => {
    return { id: ele._id, name: ele.name, income: 0 };
  });
  contractList.map((ele) => {
    if (ele.payDate >= fromDay && ele.payDate <= toNextDay) {
      ele.skill.forEach((elem) => {
        const index = skills.findIndex((element) => {
          return String(elem) === String(element.id);
        });
        skills[index].income += ele.value;
      });
    }
    return ele;
  });
  skills.sort(compareIncome);
  const data = skills.slice(skills.length - 10, skills.length);
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(data[10 - i - 1]);
  }
  return res.status(200).send({
    message: result,
  });
};
