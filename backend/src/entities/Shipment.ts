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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  recipientName!: string;

  @Column()
  recipientAddress!: string;

  @Column()
  shipmentDetails!: string;

  @Column()
  status!: string;

  @BeforeInsert()
  generateTrackingNumber() {
    this.trackingNumber = uuidv4();
  }
  @Column()
  trackingNumber!: string;
  @ManyToOne(() => User, (user) => user.shipments)
  user!: User;
}
