const User = require('../models/users')

exports.getAllUser = async (req,res) =>{
    const {page} = req.params
    const pageSize = 25
    const list = await User.find()
                            .skip(page*pageSize)
                            .limit(pageSize)
    return  res.status(200).send({
        message: list,
    });
}
exports.getNumberUser = async (req,res) =>{
    const num = await User.count()
    return res.status(200).send({
        message: num,
    });
}

exports.getUserDetail = async (req,res)=>{
    const user = await User.findById(req.params.id);
    return res.status(200).send({
        message: user,
    });
}

exports.blockUser = async (req,res)=>{
    const user = await User.findById(req.params.id);
    if (user)
    {
        user.isBlocked = true;
        await user.save();
        res.status(200).send({
            message: 'DOne',
        });
    } else {
        res.status(500).send({
            message: "Can't find user",
        });
    }
    return res;
}