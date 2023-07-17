const express = require("express");
const app = express();
const port = 4003;
const bcrypt = require("bcryptjs");
const session = require('express-session');
const {User,Comments ,Post} = require("./models");
require("dotenv").config();


app.get("/",(req,res)=>{
res.send(User.findOne())  
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
