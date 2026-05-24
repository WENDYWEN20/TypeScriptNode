import dotenv from "dotenv";

dotenv.config();
interface Config {
  port: number | string;
  nodeEnv: string;
}

const config: Config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
