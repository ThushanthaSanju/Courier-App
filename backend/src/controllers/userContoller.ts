import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../config/data-source";
import { UserModuleRepo } from "../repository/user";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { UserDTO } from "../dto/user";
const Repo = UserModuleRepo;

/**
 * Registers a new user.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const registerUser = async (req: Request, res: Response) => {
  const userDto = plainToClass(UserDTO, req.body);
  const errors = await validate(userDto);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  const userRepository = AppDataSource.manager.withRepository(Repo);
  const { email, password, name, address } = req.body;

  const userExists = await userRepository.findOneBy({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const user = userRepository.create({ email, password, name, address });
  user.password = await bcrypt.hash(password, 10);

  await userRepository.save(user);

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  res.status(201).send({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
    },
    token: token,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.manager.withRepository(Repo);
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  res.header("auth-token", token).send({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
    },
    token: token,
  });
};
