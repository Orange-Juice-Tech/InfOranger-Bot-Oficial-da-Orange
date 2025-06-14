import getEnv from "./getEnv";

const isDev = () => {
  const isProd = getEnv("NODE_ENV", "develop") === "production";

  return !isProd;
};

export default isDev;
