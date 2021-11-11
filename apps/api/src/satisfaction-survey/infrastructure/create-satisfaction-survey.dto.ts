import { ICreateSatisfactionSurveyDto } from "@myorg/api-interfaces"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSatisfactionSurveyDto implements ICreateSatisfactionSurveyDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  score: number
}
