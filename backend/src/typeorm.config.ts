import { DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ["src/entities/*.ts"],
  logging: true,
};

export default typeOrmConfig;
