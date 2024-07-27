import { Shipment } from "../entities/Shipment";
import { DataSource } from "typeorm";
import AppDataSource from "../data-source";
const dataSource: DataSource = AppDataSource;

export const ShipmentModuleRepo = dataSource.getRepository(Shipment).extend({});
