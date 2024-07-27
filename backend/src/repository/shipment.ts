import { Shipment } from "../entities/Shipment";
import { DataSource } from "typeorm";
import AppDataSource from "../config/data-source";

/**
 * Represents the repository for the Shipment module.
 */
const dataSource: DataSource = AppDataSource;

/**
 * The repository for the Shipment module, extending the base repository for the Shipment entity.
 */
export const ShipmentModuleRepo = dataSource.getRepository(Shipment).extend({});
