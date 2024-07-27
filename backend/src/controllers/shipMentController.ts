import { Request, Response } from "express";
import { ShipmentModuleRepo } from "../repository/shipment";
import { UserModuleRepo } from "../repository/user";
import AppDataSource from "../config/data-source";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ShipmentDTO } from "../dto/shipment";

const RepoShip = ShipmentModuleRepo;
const RepoUser = UserModuleRepo;

// Create Shipment
/**
 * Creates a new shipment.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created shipment or an error response.
 */
export const createShipment = async (req: Request, res: Response) => {
  const shipmentDto = plainToClass(ShipmentDTO, req.body);
  const errors = await validate(shipmentDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  const shipmentRepository = AppDataSource.manager.withRepository(RepoShip);
  const userRepository = AppDataSource.manager.withRepository(RepoUser);

  const { recipientName, recipientAddress, shipmentDetails, status } = req.body;

  if (!req.user) {
    return res.status(401).send("User not authenticated");
  }

  try {
    const user = await userRepository.findOneBy({ id: req.user.id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const shipment = shipmentRepository.create({
      recipientName,
      recipientAddress,
      shipmentDetails,
      user,
      status,
    });

    await shipmentRepository.save(shipment);
    res.status(201).send(shipment);
  } catch (error) {
    res.status(500).send("Error creating shipment");
  }
};

// Get Shipment by ID
export const getShipmentById = async (req: Request, res: Response) => {
  const shipmentRepository = AppDataSource.manager.withRepository(RepoShip);
  const { id } = req.params;

  try {
    const shipment = await shipmentRepository.findOneBy({
      id: parseInt(id, 10),
    });
    if (!shipment) {
      return res.status(404).send("Shipment not found");
    }

    res.status(200).send(shipment);
  } catch (error) {
    res.status(500).send("Error retrieving shipment");
  }
};

// Track Shipment
/**
 * Fetches the details of a shipment and the associated user based on the tracking number.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON object containing the shipment and user details if found, or an error message if not found.
 */
export const trackShipment = async (req: Request, res: Response) => {
  const shipmentRepository = AppDataSource.manager.withRepository(RepoShip);
  const userRepository = AppDataSource.manager.withRepository(RepoUser);
  const { trackingNumber } = req.params;

  try {
    // Fetch the shipment details
    const shipment = await shipmentRepository.findOne({
      where: { trackingNumber },
      relations: ["user"], // Ensure the user relation is loaded
    });

    if (!shipment) {
      return res.status(404).send("Shipment not found");
    }

    // Fetch the user associated with the shipment
    const user = await userRepository.findOne({
      where: { id: shipment.user.id },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Return both shipment and user details
    res.status(200).send({
      shipment: {
        id: shipment.id,
        trackingNumber: shipment.trackingNumber,
        status: shipment.status,
        recipientName: shipment.recipientName,
        recipientAddress: shipment.recipientAddress,
        shipmentDetails: shipment.shipmentDetails,
      },
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).send("Error tracking shipment");
  }
};

// Get User Shipments
export const getUserShipments = async (req: Request, res: Response) => {
  const shipmentRepository = AppDataSource.manager.withRepository(RepoShip);

  if (!req.user) {
    return res.status(401).send("User not authenticated");
  }

  try {
    const shipments = await shipmentRepository.find({
      where: { user: { id: req.user.id } },
    });

    res.status(200).send(shipments);
  } catch (error) {
    res.status(500).send("Error retrieving user shipments");
  }
};
