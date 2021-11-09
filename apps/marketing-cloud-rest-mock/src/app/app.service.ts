import { CustomerEventRequest } from "./customer-event-request";

export class AppService {

  proccess(customerEventRequest: CustomerEventRequest): Promise<any> {
    console.log('Customer event received', customerEventRequest)
    console.log(`Email sent to ${customerEventRequest?.Data?.email}`)
    return Promise.resolve({})
  }
}