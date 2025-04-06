import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};

export default getEnv;
