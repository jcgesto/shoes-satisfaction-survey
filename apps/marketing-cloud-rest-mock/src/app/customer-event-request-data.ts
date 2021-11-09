import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CustomerEventRequestData {
  
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  discountCode: string
}
