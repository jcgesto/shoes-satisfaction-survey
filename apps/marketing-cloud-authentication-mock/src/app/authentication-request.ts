import { IsNotEmpty, IsString } from "class-validator"

export class AuthenticationRequest {
  
  @IsNotEmpty()
  @IsString()
  grant_type: string

  @IsNotEmpty()
  @IsString()
  client_id: string
  
  @IsNotEmpty()
  @IsString()
  client_secret: string
}
