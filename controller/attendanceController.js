const attendanceDB = require("../models/attendanceModel");
const response = require("../utils/response");

class AttendanceController {
  async getAttendance(req, res) {
    try {
      const attendance = await attendanceDB.find({
        edu_id: req.edu.id,
        group_id: req.params.id,
        date: req.params.date,
      });
      if (!attendance.length) return response.notFound(res);
      response.success(res, "Attendance found", attendance);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }
  async getAttendanceByMonth(req, res) {
    try {
      const { year, month } = req.params;
      const startOfMonth = moment(`${year}-${month}-01`)
        .startOf("month")
        .toDate();
      const endOfMonth = moment(startOfMonth).endOf("month").toDate();

      const result = await attendanceDB
        .find({
          edu_id: req.edu.id,
          group_id: req.params.id,
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        })
        .populate("student_id", "Student");

      if (!result.length) return response.notFound(res);
      response.success(res, "Attendance found", result);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  async createAttendance(req, res) {
    try {
      let data = { ...req.body, edu_id: req.edu.id };
      const attendance = await attendanceDB.create(data);
      if (!attendance) return response.error(res, "Attendance not created");
      response.created(res, "Saved", attendance);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }
}

module.exports = new AttendanceController();
