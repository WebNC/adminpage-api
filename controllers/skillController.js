const Skill = require('../models/skills')

exports.getSkill = async (req,res) =>{
    const skill = await Skill.find({isDeleted: false})
    return res.status(200).send({
        message: skill,
    });
}
exports.createSkill = async (req,res) =>{
    const {value} = req.body
    const skill = new Skill({
        name: value,
    })
    await skill.save()
    return res.status(200).send({
        message: 'Done',
    });
}
exports.updateSkill = async (req,res) =>{
    const {id,value} = req.body
    const skill = await Skill.findById(id)
    if (skill) 
    {
        skill.name = value
        await skill.save()
        res.status(200).send({
            message: 'Done',
        });
    } else {
        res.status(500).send({
            message: "Can't find skill",
        });
    }
    return res
}
exports.deleteSkill = async (req,res) =>{
    const {id} = req.body
    const skill = await Skill.findById(id)
    if (skill) 
    {
        skill.isDeleted = true
        await skill.save()
        res.status(200).send({
            message: 'Done',
        });
    } else {
        res.status(500).send({
            message: "Can't find skill",
        });
    }
    return res
}