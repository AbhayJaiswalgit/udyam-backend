const Joi = require("joi");

// Joi schema for validating the incoming form data
const formSchema = Joi.object({
  aadhaar_number: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .required()
    .messages({
      "string.pattern.base": "Aadhaar number must be a 12-digit number.",
      "string.empty": "Aadhaar number is required.",
    }),
  name_of_entrepreneur: Joi.string().required().messages({
    "string.empty": "Name of entrepreneur is required.",
  }),
  pan_number: Joi.string()
    .pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "PAN number must be a valid format.",
      "string.empty": "PAN number is required.",
    }),
  pan_name: Joi.string().required().messages({
    "string.empty": "Name as per PAN is required.",
  }),
  type_of_organization: Joi.string()
    .valid(
      "Proprietorship",
      "Partnership",
      "Hindu Undivided Family (HUF)",
      "Company",
      "Limited Liability Partnership"
    )
    .required()
    .messages({
      "any.only": "Invalid type of organization selected.",
      "string.empty": "Type of organization is required.",
    }),
  pin_code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "PIN code must be a 6-digit number.",
      "string.empty": "PIN code is required.",
    }),
  state: Joi.string().required().messages({
    "string.empty": "State is required.",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required.",
  }),
});

module.exports = formSchema;
