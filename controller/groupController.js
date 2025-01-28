const GroupDB = require("../models/groupModel");
const response = require("../utils/response");

class GroupController {
  async getGroups(req, res) {
    try {
      const groups = await GroupDB.find({ edu_id: req.edu.id });
      if (!groups.length) return response.notFound(res);
      response.success(res, "Groups found", groups);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  // create
  async createGroup(req, res) {
    try {
      let exactGroup = await GroupDB.findOne({ name: req.body.name });
      if (exactGroup)
        return response.warning(
          res,
          `${exactGroup.name} already exists, please choose another name`,
          exactGroup
        );
      const newGroup = await GroupDB.create({
        ...req.body,
        edu_id: req.edu.id,
      });
      if (!newGroup) return response.error(res, "Group not created", newGroup);
      response.created(res, "Group created", newGroup);
    } catch (error) {
      response.serverError(res, error.message, error);
    }
  }

  // delete group by id with edu_id
  async deleteGroup(req, res) {
    try {
      const group = await GroupDB.findOneAndDelete({
        _id: req.params.id,
        edu_id: req.edu.id,
      });
      if (!group) return response.notFound(res);
      response.success(res, "Group deleted", group);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  // update group by id with edu_id
  async updateGroup(req, res) {
    try {
      const group = await GroupDB.findOneAndUpdate(
        { _id: req.params.id, edu_id: req.edu.id },
        req.body,
        { new: true }
      );
      if (!group) return response.error(res, "Group not updated", group);
      response.success(res, "Group updated", group);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }
}

module.exports = new GroupController();
