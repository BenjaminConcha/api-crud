const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

// Get Userdata

router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Register Userdata

router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, address, description } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !description) {
    res.status(422).json("please fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this user is already present");
    } else {
      const adduser = new users({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// Delete Userdata

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({ _id: id });

    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get individual Userdata

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userIndividual = await users.findById(id);
    console.log(userIndividual);
    res.status(201).json(userIndividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//Update Userdata

router.put("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
