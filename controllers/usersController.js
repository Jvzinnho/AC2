const bcrypt = require("bcryptjs");
const express = require("express");
const UserModel = require("../models/user");
const auth = require("../middlewares/auth");
const userController = express.Router();

userController.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ mensagem: "User not found!" });
  }
  return res.status(200).json(user);
};

userController.createUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaEncrypt = await bcrypt.hash(senha, 10);
  const user = new UserModel({
    nome,
    email,
    senha: senhaEncrypt,
  });

  try {
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(`Error while creating a new user: ${err}`);
    return res.status(500).json({ erro: err });
  }
};

module.exports = userController;
