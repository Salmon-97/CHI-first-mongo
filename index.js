const express = require("express");
const mongoose = require("mongoose");
const { unknownRoute, getBase, createUser, fetchAllUsers, updateUser, deleteUser, } = require("./controllers");
const { validateSignupData, validateLoginData, } = require("./controllers/validators/auth.validators");
const { loginUser, signupUser, isTokenValid } = require("./controllers/auth.controllers");
const app = express();
const PORT = 5454;
const dotenv = require("dotenv");
dotenv.config();


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", getBase)
app.post("/user", validateSignupData, createUser);
app.get("/User", fetchAllUsers,);
app.put("/user/:id", updateUser)
app.post("/signup", validateSignupData, signupUser)
app.post("/login", validateLoginData, loginUser);
app.delete("/user/:id", deleteUser);
app.post("/post", isTokenValid, (req, res) => {
  try {
    res.status(200).json({
      message: "you are authorized to to view this page"
  });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
            message: "server error"
        });
  }
});

app.all("*", unknownRoute);


app.listen(PORT, async () => {
    try {
    console.log("server is running on port ${PORT}");
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
  }
});



// user = {
    // firstname: '',
    // lastname: '',
    // age: 20,
    // email: '',
    // password: ''
// }