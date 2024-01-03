import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  TEST_MONGO_URI: process.env.TEST_MONGO_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY,
  BCRYPT_SALT: process.env.BCRYPT_SALT
};

export default serverConfig;
