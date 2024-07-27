import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModuleRepo } from "../repository/user";
import AppDataSource from "../config/data-source";

const RepoUser = UserModuleRepo;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const userRepository = AppDataSource.manager.withRepository(RepoUser);
    const user = await userRepository.findOneBy({ id: decoded.id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
