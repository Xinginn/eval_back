

const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors());

const port = 3300;

const { PrismaClient } = require('@prisma/client');
const bodyParser = require("body-parser");
const prisma = new PrismaClient()

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/users/:uuid", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { uuid } })
  res.send(user);
});

app.post("/users", bodyParser.json(), async (req, res) => {
  const user = await prisma.user.create({ data: req.body })
  res.send(user);
});

app.patch("/users/:uuid", bodyParser.json(), async (req, res) => {
  const user = await prisma.user.patch({
    where: { uuid },
    data: req.body
  })
  res.send(user);
});

app.delete("/users/:uuid", async (req, res) => {
  const result = await prisma.user.delete({ where: { uuid } })
  res.send("deleted successfuly");
});


if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });
}

module.exports = app;


