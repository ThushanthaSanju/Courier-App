import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Shipment } from "./Shipment";

@Entity()
export class User {
  /**
   * The unique identifier for the user.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The name of the user.
   */
  @Column()
  name!: string;

  /**
   * The email address of the user.
   */
  @Column({ unique: true })
  email!: string;

  /**
   * The password of the user.
   */
  @Column()
  password!: string;

  /**
   * The address of the user.
   */
  @Column()
  address!: string;

  /**
   * The shipments associated with the user.
   */
  @OneToMany(() => Shipment, (shipment) => shipment.user)
  shipments!: Shipment[];
}
