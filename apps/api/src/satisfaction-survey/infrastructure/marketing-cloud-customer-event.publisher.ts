import { HttpService, Injectable } from "@nestjs/common";
import { environment } from "../../environments/environment";
import { MarketingCloudAuthenticationService } from "./marketing-cloud-authentication.service";
import { CustomerEvent } from "../domain/customer-event";
import { ICustomerEventPublisher } from "../domain/customer-event.publisher";

@Injectable()
export class MarketingCloudCustomerEventPublisher implements ICustomerEventPublisher {

  private url = `${environment.marketingCloudRestApiBaseUri}/interaction/v1/events`

  constructor(
    private readonly httpService: HttpService,
    private readonly marketingCloudAuthenticationService: MarketingCloudAuthenticationService) {}

  async publish(customerEvent: CustomerEvent): Promise<any> {
    const token = await this.marketingCloudAuthenticationService.getToken()
    const body = this.getBody(customerEvent.email, customerEvent.discountCode) 
    try {
      console.log(`Posting event to Marketing Cloud`, body, token)
      const result = await this.httpService.post(this.url, body, {
        headers: this.getHeaders(token)
      }).toPromise()
      console.log('Post success', result.data)
      return result.data
    } catch (error) {
      console.log('Post Error', error)
    }
  }

  private getBody(email: string, discountCode: string) {
    return {
      ContactKey: email,
      EventDefinitionKey: environment.eventDefinitionKey,
      Data: {
        email,
        'discount-code': discountCode,
      }
    }
  }

  private getHeaders (token: string) {
    return {
      Authorization: this.getAuthenticationHeaderValue(token)
    }
  }

  private getAuthenticationHeaderValue (token: string): string {
    return `Bearer ${token}`
  }
}