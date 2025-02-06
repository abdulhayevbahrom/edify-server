const TeacherDB = require("../models/teacherModel");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const FormData = require("form-data");
const axios = require("axios");

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
      let info = JSON.parse(JSON.stringify(req.body));
      info.socialNetworks = JSON.parse(info.socialNetworks);
      info.phone = JSON.parse(info.phone);
      info.salary = parseInt(info.salary);
      let new_data = { ...info, edu_id: req.edu.id };

      let file = req.file;

      if (file) {
        const formData = new FormData();
        const processedImage = await sharp(req.file.buffer)
          .resize({ width: 400, height: 400, fit: "cover" }) // 3x4 format
          .jpeg({ quality: 100 }) // Sifatni saqlash
          .toBuffer();

        formData.append("image", processedImage.toString("base64"));

        let api = `${process.env.IMAGE_BB_API_URL}?key=${process.env.IMAGE_BB_API_KEY}`;
        const response = await axios.post(api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.data?.url) {
          new_data.image = response.data.data.url;
        }
      }

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
