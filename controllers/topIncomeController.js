/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const Contract = require('../models/contracts');
const Teacher = require('../models/users');
const Skill = require('../models/skills');

const compareIncome = (a, b) => {
  return a.income < b.income;
};
exports.getTopTeacherIncome = async (req, res) => {
  const teacherList = await Teacher.find({ type: 'Nguời dạy' });
  const contractList = await Contract.find({ status: 'Đã hoàn thành' });
  const teachers = teacherList.map((ele) => {
    return { id: ele._id, name: ele.name, income: 0 };
  });
  contractList.map((ele) => {
    ele.skill.forEach((elem) => {
      const index = teachers.findIndex((element) => {
        return String(elem) === String(element.id);
      });
      teachers[index].income += ele.value;
    });
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
  const contractList = await Contract.find({ status: 'Đã hoàn thành' });
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
  const data = skills.slice(0, 10);
  return res.status(200).send({
    message: data,
  });
};
