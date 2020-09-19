const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path')
const connection = require("./mongoDb/connection");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const { signup } = require("./handlers/signup");
// const { login } = require("./handlers/login");
// const { getCategory } = require("./handlers/getCategory");
// const { signupSp } = require("./handlers/signupSp");
// const { getUsersInCategory } = require("./handlers/getUsersInCategory");

require('./routes/api-routes')(app);

// app.post("/login", login);
// app.post("/signup", signup);
// app.get("/getCategory", getCategory);
// app.post("/signupSp", signupSp);
// app.post("/getUsersInCategory", getUsersInCategory);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
}

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  connection.connectDb(async (err) => {
    if (err) throw err;
    console.log(`listening on ${PORT} `);
  });
});
