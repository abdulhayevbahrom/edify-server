const TeacherDB = require("../models/teacherModel");
const response = require("../utils/response");
const bcrypt = require("bcrypt");

class TeacherController {
  async getTeachers(req, res) {
    try {
      const teachers = await TeacherDB.find({ edu_id: req.edu.id });
      if (!teachers.length) return response.notFound(res);
      response.success(res, "Teachers found", teachers);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }

  async createTeacher(req, res) {
    try {
      let new_data = { ...req.body, edu_id: req.edu.id };

      let salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT);
      let hashedPassword = await bcrypt.hash(new_data.password, +salt);
      new_data.password = hashedPassword;

      const teacher = await TeacherDB.create(new_data);
      if (!teacher) return response.error(res, "Teacher not created");
      response.created(res, "Teacher created", teacher);
    } catch (err) {
      response.serverError(res, err.message);
    }
  }
}

module.exports = new TeacherController();
