const Users = require("../models/UserModel");
const argon2 = require("argon2");

const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "email doesn't exist" });
  }
  console.log("qwe")
  console.log(user.password)
  const match = await argon2.verify(user.password, req.body.password);
  console.log(match)
  if (!match) {
    return res.status(400).json({ msg: "wrong password" });
  }
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

const session = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "please login again" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }
  res.status(200).json(user);
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "logout failed" });
    }
    res.status(200).json({ msg: "logout successfully" });
  });
};

module.exports = { login, logout, session };
