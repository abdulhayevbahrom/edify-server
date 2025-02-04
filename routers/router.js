const router = require("express").Router();

const eduValidation = require("../validation/eduValidation");
const eduController = require("../controller/educationsController");

const teacherValidation = require("../validation/teacherValidation");
const teacherController = require("../controller/TeacherController");

const groupValidation = require("../validation/groupValidation");
const groupController = require("../controller/groupController");

const paymentValidation = require("../validation/paymentValidation");
const paymentController = require("../controller/paymentController");

// EDUCATIONS ROUTES
router.get("/edu/all", eduController.getEducations);
router.post("/edu/create", eduValidation, eduController.createEducation);
router.delete("/edu/delete/:id", eduController.deleteEducation);
router.put("/edu/update/:id", eduValidation, eduController.updateEducation);
router.post("/edu/login", eduController.login);

// TEACHERS ROUTES
router.get("/teacher/all", teacherController.getTeachers);
router.post(
  "/teacher/create",
  teacherValidation,
  teacherController.createTeacher
);

// GROUPS ROUTES
router.get("/group/all", groupController.getGroups);
router.post("/group/create", groupValidation, groupController.createGroup);

// message routes
const messageController = require("../controller/messageController");
router.post("/message/create", messageController.createMessage);
router.get("/message/all", messageController.getMessages);

// attendances routes
const attendanceController = require("../controller/attendanceController");
router.post("/attendance/create", attendanceController.createAttendance);
router.get("/attendance/:date", attendanceController.getAttendanceByMonth);
router.get(
  "/attendance/:year/:month",
  attendanceController.getAttendanceByMonth
);

// payments routes
router.post(
  "/payment/create",
  paymentValidation,
  paymentController.createPayment
);

router.get("/payment/today", paymentController.getPaymentsByDate);
router.get("/payment/:year/:month", paymentController.getPaymentsByMonth);
router.get("/payment/:id", paymentController.getPaymentByStudent);
router.get("/payment/statistic", paymentController.getStatistic);

module.exports = router;
