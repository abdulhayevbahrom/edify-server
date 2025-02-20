const StudentDB = require("../models/studentModel");
const response = require("../utils/response");
const bcrypt = require("bcrypt");

class StudentController {
  async getStudents(req, res) {
    try {
      const students = await StudentDB.find({ edu_id: req.edu.id });
      if (!students.length) return response.notFound(res);
      response.success(res, "Students found", students);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createStudent(req, res) {
    try {
      let new_data = { ...req.body, edu_id: req.edu.id };
      const student = await StudentDB.create(new_data);
      if (!student) return response.error(res, "Student not created");
      response.created(res, "Student created", student);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async searchStudents(req, res) {
    try {
      let { search } = req.body;
      const students = await StudentDB.find({
        $or: [{ fullname: { $regex: search, $options: "i" } }],
        edu_id: req.edu.id,
      });
      if (!students.length) return response.notFound(res);
      response.success(res, "Students found", students);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new StudentController();
