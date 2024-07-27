import { User } from "../../entities/User";

/**
 * Extends the Express namespace with a custom property.
 */
declare global {
  namespace Express {
    /**
     * Represents the user associated with the request.
     */
    interface Request {
      user?: User;
    }
  }
}
