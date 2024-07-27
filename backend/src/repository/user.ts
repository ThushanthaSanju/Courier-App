/**
 * Represents the User module repository.
 * @extends dataSource.getRepository(User)
 */
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import AppDataSource from "../config/data-source";
const dataSource: DataSource = AppDataSource;

export const UserModuleRepo = dataSource.getRepository(User).extend({});
