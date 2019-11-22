/* eslint-disable indent */
const passport = require('passport');
const User = require('../models/admins');


// var fs = require('fs');
// var path = require ('path');

exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Some params is missing.',
        });
    }
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(400).send({ message: 'Email đã tồn tại.' });
            } else {
                const newUser = new User({
                    email: req.body.email,
                    username: req.body.username,
                    age: req.body.age,
                    sex: req.body.sex,
                    address: req.body.address,
                    phone: req.body.phone,
                });
                newUser.setPassword(req.body.password);
                newUser.save()
                    .then((data) => {
                        res.send(data.toAuthJSON());
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the User.',
                        });
                    });
            }
        });
    return true;
};
exports.login = (req, res, next) => {
    if (!req.body.email) {
        return res.status(500).send({
            message: 'Email is require.',
        });
    }

    if (!req.body.password) {
        return res.status(500).send({
            message: 'Password is require.',
        });
    }

    passport.authenticate('local', { session: false }, (err, passportUser) => {
        if (err) {
            return next(err);
        }
        if (passportUser) {
            const user = passportUser;
            return res.json({ user: user.toAuthJSON() });
        }
        return res.status(400).send({
            message: 'Đăng nhập không thành công.',
        });
    })(req, res, next);
    return true;
};
exports.me = (req, res) => {
    const { id } = req.payload;
    return User.findById(id)
        .then((user) => {
            if (!user) {
                res.sendStatus(400);
            } else {
                res.send(user);
            }
        });
};
// exports.edit = (req, res) => {
//     const { id } = req.payload;
//     const {username,password,email,age} = req.body
//     return User.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.sendStatus(400);
//             }
//             user.email = email||user.email
//             user.age = age
//             user.username = username||user;
//             if(password)
//                 user.setPassword(password)
//             user.save()
//             res.send(user)
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while update the User."
//             });
//         });
// }

// exports.upload = (req, res) => {
//     const { id } = req.payload;
//     User.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.sendStatus(400);
//             }
//             user.url = req.file.url
//             user.save()
//             res.send(user.url)
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while update the User."
//             });
//     });
// }

// exports.show =  (req, res) => {
//     const fileName = req.params.name;
//     console.log('fileName', fileName);
//     if (!fileName) {
//         return res.send({
//             status: false,
//             message: 'no filename specified',
//         })
//     }
//     res.sendFile(path.resolve(`./images/${fileName}`));
// }
