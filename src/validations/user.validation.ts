import Joi from "joi";
import { password } from "./custom.validation";

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    acceptedTerms: Joi.boolean().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid({
      separator: "-",
      version: "uuidv4",
    }),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid({
      separator: "-",
      version: "uuidv4",
    }),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid({
      separator: "-",
      version: "uuidv4",
    }),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
