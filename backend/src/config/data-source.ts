import { DataSource } from "typeorm";
import typeOrmConfig from "./typeorm.config";
/**
 * Represents the application data source.
 */
const AppDataSource = new DataSource(typeOrmConfig);

export default AppDataSource;
