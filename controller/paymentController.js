const paymentDB = require("../models/paymentsModel");
const response = require("../utils/response");
const moment = require("moment");

class paymentController {
  async getPaymentsByDate(req, res) {
    let startOfDay = moment().startOf("day").toDate();
    let endOfDay = moment(startOfDay).endOf("day").toDate();
    let allPayments = await paymentDB
      .find({
        edu_id: req.edu.id,
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      })
      .populate("student_id", "Student");
    if (!allPayments.length) return response.notFound(res);
    response.success(res, "Payments found", allPayments);
  }

  // payments month
  async getPaymentsByMonth(req, res) {
    let startOfMonth = moment().startOf("month").toDate();
    let endOfMonth = moment(startOfMonth).endOf("month").toDate();
    let allPayments = await paymentDB
      .find({
        edu_id: req.edu.id,
        createdAt: { $gte: startOfMonth, $lt: endOfMonth },
      })
      .populate("student_id", "Student");
    if (!allPayments.length) return response.notFound(res);
    response.success(res, "Payments found", allPayments);
  }

  // create
  async createPayment(req, res) {
    try {
      let data = { ...req.body, edu_id: req.edu.id };
      const payment = await paymentDB.create(data);
      if (!payment) return response.error(res, "Payment not created");
      response.created(res, "Saved", payment);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  //   get payment by student_id
  async getPaymentByStudent(req, res) {
    try {
      const payment = await paymentDB.find({
        edu_id: req.edu.id,
        student_id: req.params.id,
      });
      if (!payment.length) return response.notFound(res);
      response.success(res, "Payment found", payment);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }

  async getStatistic(req, res) {
    try {
      let edu_id = req.edu.id;

      let data = await paymentDB.aggregate([
        {
          $match: { edu_id: edu_id },
        },
        {
          $group: {
            _id: {
              year: { $year: "$created_at" },
              month: { $month: "$created_at" },
            },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);

      if (!data.length) return response.notFound(res);
      response.success(res, "Statistic found", data);
    } catch (error) {
      response.serverError(res, error.message);
    }
  }
}

module.exports = new paymentController();
