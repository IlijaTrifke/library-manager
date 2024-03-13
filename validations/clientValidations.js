const yup = require("yup");

const createSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isPremium: yup.boolean(),
  membershipStart: yup.date(),
  membershipDuration: yup
    .string()
    .matches(/^(1y|6m)$/, "Expected <1y> or <6m>")
    .required(),
});
module.exports = { createSchema };
