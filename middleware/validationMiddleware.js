const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

module.exports = validate;
