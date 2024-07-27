import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Shipment {
  /**
   * The unique identifier for the shipment.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The name of the recipient of the shipment.
   */
  @Column()
  recipientName!: string;

  /**
   * The address of the recipient of the shipment.
   */
  @Column()
  recipientAddress!: string;

  /**
   * The details of the shipment.
   */
  @Column()
  shipmentDetails!: string;

  /**
   * The status of the shipment.
   */
  @Column()
  status!: string;

  /**
   * Generates a tracking number for the shipment before it is inserted into the database.
   */
  @BeforeInsert()
  generateTrackingNumber() {
    this.trackingNumber = uuidv4();
  }

  /**
   * The tracking number of the shipment.
   */
  @Column()
  trackingNumber!: string;

  /**
   * The user associated with the shipment.
   */
  @ManyToOne(() => User, (user) => user.shipments)
  user!: User;
}
