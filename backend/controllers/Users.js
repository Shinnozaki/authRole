const Users = require("../models/UserModel");
const argon2 = require("argon2");

const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      // attributes: ['uuid', 'name', 'email', 'role']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await argon2.hash(password);
  console.log(hashed);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashed,
      role: role,
    });
    res.status(200).json({ msg: "register successful!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "user not found!" });
  }
  const { name, email, password, role } = req.body;
  let hashed;
  console.log(hashed);
  if (password === "" || password === null) {
    hashed = user.password;
    console.log(user.password);
    console.log(hashed);
  }
  console.log(hashed);

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashed,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "user successfully updated!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "user not found!" });
  }
  try {
    await user.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "user successfully deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser };
