import express from "express";
import userModel from "../../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ msg: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getbyid", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    res.status(200).json({ msg: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/editbyid", async (req, res) => {
  try {
    let { fullName, email, phone, password } = req.body;
    let updating = { fullName, email, phone, password };
    if (password) {
      const hashPass = await bcrypt.hash(password, 12);
      updating.password = hashPass;
    }

    await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: updating },
      { new: true }
    );
    res.status(200).json({ msg: "user Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deletebyid", async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.user.id });
    res.status(200).json({ msg: "user Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All users deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
