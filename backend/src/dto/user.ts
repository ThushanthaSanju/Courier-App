// user.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  address: string;

  constructor(name: string, email: string, password: string, address: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
  }
}
