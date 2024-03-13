const yup = require("yup");

const createSchema = yup.object({
  editionId: yup.string().required(),
  clientId: yup.string().required(),
});
module.exports = { createSchema };
