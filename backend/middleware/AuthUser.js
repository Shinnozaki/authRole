const Users = require("../models/UserModel");

const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(400).json({msg: "please login again"})
    }
    const user = await Users.findOne({
        where : {
            uuid: req.session.userId
        }
    })
    if(!user) {
        return res.status(400).json({msg: "user not found"})
    }
    req.userId = user.id
    req.role = user.role
    next()
};

const adminOnly = async(req, res, next) => {
    const user = await Users.findOne({
        where : {
            uuid: req.session.userId
        }
    })
    if(!user) {
        return res.status(400).json({msg: "user not found"})
    }
    if(user.role !== "admin") {
        return res.status(403).json({msg: "access denied"})
    }
    next();
}

module.exports = {verifyUser, adminOnly}
