const response = require("../utils/response");
const jwt = require("jsonwebtoken");
const EduDb = require("../models/educationsModel");

const auth = async (req, res, next) => {
  try {
    let path = req.originalUrl;

    let openRoutes = ["/api/edu/login"];
    if (openRoutes.includes(path)) return next();

    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return response.error(res, "Token is required");

    let result = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!result) return response.unauthorized(res, "invalid token");

    let exactEdu = await EduDb.findOne({ _id: result.id });
    if (!exactEdu) return response.forbidden(res, "Kirish Taqiqlanadi");

    req.edu = result;
    next();
  } catch (err) {
    response.serverError(res, err.message);
  }
};

module.exports = auth;
