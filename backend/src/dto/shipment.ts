import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsEnum,
} from "class-validator";

enum ShipmentStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export class ShipmentDTO {
  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  recipientName: string;

  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  recipientAddress: string;

  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  shipmentDetails: string;

  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;

  @IsOptional()
  @IsString()
  @Length(6, 100)
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100)
  userId?: string;

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
