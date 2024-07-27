// user.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

/**
 * Represents a User Data Transfer Object (DTO).
 */
export class UserDTO {
  /**
   * The name of the user.
   */
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  /**
   * The email of the user.
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * The password of the user.
   */
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  /**
   * The address of the user.
   */
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  address: string;

  /**
   * Creates an instance of UserDTO.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param address - The address of the user.
   */
  constructor(name: string, email: string, password: string, address: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
  }
}
