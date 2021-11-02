import { CustomerEvent } from "./customer-event";

export interface ICustomerEventPublisher {
  publish(customerEventDto: CustomerEvent): Promise<any>
}
