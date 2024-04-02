const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/Users.js");
const { verifyUser, adminOnly } = require("../middleware/authUser.js");

const router = express.Router();

//admin
//email: joenadmin@gmail.com
//password: joen123

//not admin
//email: joen2@gmail.com
//password: joen123

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUsersById);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/update/:id", adminOnly, verifyUser, updateUser);
router.delete("/users/delete/:id", adminOnly, verifyUser, deleteUser);

module.exports = router;
