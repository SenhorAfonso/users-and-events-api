import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY
}

export default serverConfig;
