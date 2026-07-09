import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const schema = Joi.object({
  PORT: Joi.number().default(5000),

  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().min(15).required(),

  JWT_REFRESH_SECRET: Joi.string().min(15).required(),

  REDIS_HOST: Joi.string().required(),

  REDIS_PORT: Joi.number().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`Environment Error: ${error.message}`);
}

export default value;