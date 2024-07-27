import { User } from "../entities/User";
import { DataSource } from "typeorm";
import AppDataSource from "../data-source";
const dataSource: DataSource = AppDataSource;

export const UserModuleRepo = dataSource.getRepository(User).extend({});
