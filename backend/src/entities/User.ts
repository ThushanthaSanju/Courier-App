import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Shipment } from "./Shipment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  address!: string;

  @OneToMany(() => Shipment, (shipment) => shipment.user)
  shipments!: Shipment[];
}
