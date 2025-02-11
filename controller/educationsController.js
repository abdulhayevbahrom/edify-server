const educationDB = require("../models/educationsModel");
const teacherModel = require("../models/teacherModel");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getEducations = async (req, res) => {
  try {
    const educations = await educationDB.find();
    if (!educations.length) return response.notFound(res);
    response.success(res, "Educations found", educations);
  } catch (error) {
    response.serverError(res, error.message);
  }
};

const createEducation = async (req, res) => {
  try {
    let { login } = req.body;

    let exactEdu = await educationDB.findOne({ login });
    if (exactEdu) return response.error(res, "Login already exists", exactEdu);

    let salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT);
    const hashetPassword = await bcrypt.hash(req.body.password, +salt);

    req.body.password = hashetPassword;

    const education = await educationDB.create(req.body);
    if (!education)
      return response.error(res, "Education not created", education);

    response.created(res, "Education created", education);
  } catch (error) {
    response.serverError(res, error.message);
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await educationDB.findByIdAndDelete(id);
    if (!education) return response.error(res, "Education not deleted");
    response.success(res, "Education deleted", education);
  } catch (error) {
    response.serverError(res, error.message);
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await educationDB.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!education) return response.error(res, "Education not updated");
    response.success(res, "Education updated", education);
  } catch (error) {
    response.serverError(res, error.message);
  }
};

// login
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    let user =
      (await educationDB.findOne({ login })) ||
      (await teacherModel.findOne({ login }));
    if (!user) return response.error(res, "Login or password is incorrect");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return response.error(res, "Login or password is incorrect");

    const role = user instanceof educationDB ? "owner" : "teacher";
    const token = jwt.sign(
      { id: user._id, login: user.login, role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    response.success(res, "Login successfully", {
      edu: { ...user.toJSON(), role },
      token,
    });
  } catch (err) {
    response.serverError(res, err.message);
  }
};
module.exports = {
  getEducations,
  createEducation,
  deleteEducation,
  updateEducation,
  login,
};
