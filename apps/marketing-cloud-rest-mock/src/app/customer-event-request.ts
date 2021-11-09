import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { CustomerEventRequestData } from "./customer-event-request-data"

export class CustomerEventRequest {
  
  @IsNotEmpty()
  @IsString()
  ContactKey: string

  @IsNotEmpty()
  @IsString()
  EventDefinitionKey: string

  @IsNotEmpty()
  @ValidateNested()
  // TODO VALIDATION OF NESTED OBJECT
  Data: CustomerEventRequestData
}
