const { Router } = require("express");
const eduValidation = require("../validation/eduValidation");
const teacherValidation = require("../validation/teacherValidation");

const {
  getEducations,
  createEducation,
  deleteEducation,
  updateEducation,
  login,
} = require("../controller/educationsController");

const teacherController = require("../controller/TeacherController");
const groupController = require("../controller/groupController");
const groupValidation = require("../validation/groupValidation");
const router = Router();

// EDUCATIONS ROUTES
router.get("/edu/all", getEducations);
router.post("/edu/create", eduValidation, createEducation);
router.delete("/edu/delete/:id", deleteEducation);
router.put("/edu/update/:id", eduValidation, updateEducation);
router.post("/edu/login", login);

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

module.exports = router;
