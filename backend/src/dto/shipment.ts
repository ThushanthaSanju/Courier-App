import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsEnum,
} from "class-validator";

import { ShipmentStatus } from "../enums/shipment";
export class ShipmentDTO {
  /**
   * The name of the recipient.
   * Must be a string between 6 and 100 characters long.
   */
  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  recipientName: string;

  /**
   * The address of the recipient.
   * Must be a string between 6 and 100 characters long.
   */
  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  recipientAddress: string;

  /**
   * Details about the shipment.
   * Must be a string between 6 and 100 characters long.
   */
  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  shipmentDetails: string;

  /**
   * The status of the shipment.
   * Must be a string between 6 and 100 characters long.
   * Must be one of the values defined in the ShipmentStatus enum.
   */
  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;

  /**
   * The tracking number of the shipment.
   * Optional field.
   * Must be a string between 6 and 100 characters long.
   */
  @IsOptional()
  @IsString()
  @Length(6, 100)
  trackingNumber?: string;

  /**
   * The ID of the user associated with the shipment.
   * Optional field.
   * Must be a string between 6 and 100 characters long.
   */
  @IsOptional()
  @IsString()
  @Length(6, 100)
  userId?: string;

  /**
   * Creates a new instance of ShipmentDTO.
   * @param recipientName - The name of the recipient.
   * @param recipientAddress - The address of the recipient.
   * @param shipmentDetails - Details about the shipment.
   * @param status - The status of the shipment.
   * @param trackingNumber - The tracking number of the shipment (optional).
   * @param userId - The ID of the user associated with the shipment (optional).
   */
  constructor(
    recipientName: string,
    recipientAddress: string,
    shipmentDetails: string,
    status: ShipmentStatus,
    trackingNumber?: string,
    userId?: string
  ) {
    this.recipientName = recipientName;
    this.recipientAddress = recipientAddress;
    this.shipmentDetails = shipmentDetails;
    this.status = status;
    this.trackingNumber = trackingNumber;
    this.userId = userId;
  }
}
