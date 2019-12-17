/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
const Contract = require('../models/contracts');
const Teacher = require('../models/users');
const Skill = require('../models/skills');

const compareIncome = (a, b) => {
  return a.income > b.income;
};
exports.getTopTeacherIncome = async (req, res) => {
  const teacherList = await Teacher.find({ type: 'Nguời dạy' });
  const contractList = await Contract.find({ statusPay: true });
  const teachers = teacherList.map((ele) => { return { id: ele._id, name: ele.username, income: 0 }; });
  contractList.map((ele) => {
    teachers[ele._id].income += ele.value;
    return ele;
  });
  teachers.sort(compareIncome);
  return res.status(200).send({
    message: teachers,
  });
};

exports.getTopSkillIncome = async (req, res) => {
  const skillList = await Skill.find({ isDeleted: false });
  const contractList = await Contract.find({ statusPay: true });
  const skills = skillList.map((ele) => { return { id: ele._id, name: ele.name, income: 0 }; });
  contractList.map((ele) => {
    ele.skill.forEach((elem) => { skills[elem].income += ele.value; });
    return ele;
  });
  skills.sort(compareIncome);
  return res.status(200).send({
    message: skills,
  });
};
