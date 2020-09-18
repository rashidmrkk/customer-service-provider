const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./mongoDb/connection");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************************************COMMON************************** */
const { signup } = require("./handlers/signup");
const { login } = require("./handlers/login");
const { getCategory } = require("./handlers/getCategory");
const { signupSp } = require("./handlers/signupSp");
const { getUsersInCategory } = require("./handlers/getUsersInCategory");



app.post("/login", login);
app.post("/signup", signup);
app.get("/getCategory", getCategory);
app.post("/signupSp", signupSp);
app.post("/getUsersInCategory", getUsersInCategory);



const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  connection.connectDb(async (err) => {
    if (err) throw err;
    console.log(`listening on ${PORT} `);
  });
});
