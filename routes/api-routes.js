const { getCategory } = require("../handlers/getCategory");
const { getUsersInCategory } = require("../handlers/getUsersInCategory");
const { login } = require("../handlers/login");
const { signup } = require("../handlers/signup");
const { signupSp } = require("../handlers/signupSp");

module.exports = function (app) {
    app.post("/login", login);
app.post("/signup", signup);
app.get("/getCategory", getCategory);
app.post("/signupSp", signupSp);
app.post("/getUsersInCategory", getUsersInCategory);

}