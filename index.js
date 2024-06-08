require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const usersController = require("./controllers/usersController");
const loginController = require("./controllers/loginControllers");
const server = express();

const port = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const DATABASE_URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@furrycode.162mos6.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Furrycode`;

server.use(express.json());

server.use("/users", usersController);
server.use("/login", loginController);

console.log("Tentando conectar ao Mongo...");
console.log(`Usando string de conexão: ${DATABASE_URL}`);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    server.listen(port, () => {
      console.log(`Servidor conectado na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
