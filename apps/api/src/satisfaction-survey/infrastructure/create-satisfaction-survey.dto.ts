import { ICreateSatisfactionSurveyDto } from "@myorg/api-interfaces"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSatisfactionSurveyDto implements ICreateSatisfactionSurveyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  lastname: string
  
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  notes?: string

  @IsNotEmpty()
  @IsNumber()
  score: number
}
