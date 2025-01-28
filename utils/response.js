class response {
  success(res, message = "success", data = null) {
    return res.status(200).json({
      state: true,
      message,
      innerData: data,
    });
  }

  created(res, message = "created", data = null) {
    return res.status(201).json({
      state: true,
      message,
      innerData: data,
    });
  }

  error(res, message = "error", data = null) {
    return res.status(400).json({
      state: false,
      message,
      innerData: data,
    });
  }

  warning(res, message = "warning", data = null) {
    return res.status(400).json({
      state: false,
      message,
      innerData: data,
    });
  }

  serverError(res, message = "Server Error", data = null) {
    return res.status(500).json({
      state: false,
      message,
      innerData: data,
    });
  }

  notFound(res, message = "Not Found", data = null) {
    return res.status(404).json({
      state: false,
      message,
      innerData: data,
    });
  }

  unauthorized(res, message = "Unauthorized", data = null) {
    return res.status(401).json({
      state: false,
      message,
      innerData: data,
    });
  }

  forbidden(res, message = "Forbidden", data = null) {
    return res.status(403).json({
      state: false,
      message,
      innerData: data,
    });
  }
}

module.exports = new response();
