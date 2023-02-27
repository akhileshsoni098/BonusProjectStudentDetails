const userModel = require("../models/userModel");
const studentModel = require("../models/SutudentModel");
const jwt = require("jsonwebtoken");

const resisterUser = async (req, res) => {
  try {
    const data = req.body;
    const { userName, password } = req.body;

    if (!userName) {
      return res
        .status(400)
        .send({ status: false, message: "user name is mandatory" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "user password is mandatory" });
    }

    let userExist = await userModel.findOne({ userName: userName });
    if (userExist) {
      return res
        .status(400)
        .send({ status: false, message: "user already Exist" });
    }
    const userCreate = await userModel.create(data);
    res.status(200).send({ status: true, data: userCreate });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const data = req.body;
    const { userName, password } = req.body;

    const checkUser = await userModel.findOne({ userName: userName });
    if (!checkUser) {
      return res
        .status(400)
        .send({ status: false, message: "Please Resister yourself" });
    }
    if (password != checkUser.password) {
      return res
        .status(400)
        .send({ status: false, message: "Incorrect password" });
    }
    let token = jwt.sign({ userId: checkUser._id }, "secreateKey");

    res.setHeader("Authorization", `Bearer ${token}`);

    let studentData = await studentModel.find({ isDeleted: false });

    res
      .status(200)
      .send({
        status: true,
        message: "loggIn successfull",
        token: token,
        data: studentData,
      });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const getDataFilter = async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.query;
    let { name, subject } = data;
    console.log(data.name);
    if (name) {
      let getDetails = await studentModel.findOne({ name: data.name });
      if (getDetails.length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "this name is not exist" });
      }
      res.status(200).send({ status: true, message: getDetails });
    }
    if (subject) {
      let getDeta = await studentModel.find({ subject: data.subject });
      if (getDeta.length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "this subject is not exist" });
      }
      res.status(200).send({ status: true, message: getDeta });
    }

    if (subject && name) {
      let getDetaBoth = await studentModel.findOne({
        subject: subject,
        name: name,
      });
      if (getDetaBoth.length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "name or subject is not exist" });
      }
      res.status(200).send({ status: true, message: getDetaBoth });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.body;
    let { name, subject, marks } = data;

    let nameExist = await studentModel.findOne({
      name: data.name,
      subject: data.subject,
    });

    if (nameExist) {
      let updateMarks = await studentModel.findOneAndUpdate(
        { name: data.name, subject: data.subject, isdeleted: false },
        { $set: { marks: data.marks } },
        { new: true }
      );
      return res.status(200).send({ status: false, data: updateMarks });
    }
    let newData = await studentModel.create(data)
    res.status(400).send({ status: false, data: newData});
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

let deleteData = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.userId;

    let { name } = data;
    console.log(data.name);
    await studentModel.findOneAndUpdate(
      { name: data.name, isDeleted: false },
      {isDeleted: true },
      { new: true }
    );
    return res
      .status(200)
      .send({status: true, message: "deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  resisterUser,
  logIn,
  getDataFilter,
  updateStudent,
  deleteData,
};
