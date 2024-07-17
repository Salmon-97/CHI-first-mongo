const express = require("express");
const mongoose = require("mongoose");
const { unknownRoute, getBase, createUser, fetchAllUsers, updateUser, deleteUser } = require("./controllers");
const app = express();
const PORT = 5454;


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", getBase)
app.post("/user", createUser);
app.get("/User", fetchAllUsers);
app.put("/user/:id", updateUser)
app.delete("/user/:id", deleteUser)
app.all("*", unknownRoute);


app.listen(PORT, async () => {
    try {
    console.log("server is running on port ${PORT}");
    await mongoose.connect("mongodb://localhost:27017/first-mongo");
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