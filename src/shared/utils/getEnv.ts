import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, default_value?: string) => {
  const value = process.env[key];

  if (!value) {
    if (default_value) {
      return default_value;
    }

    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export default getEnv;
