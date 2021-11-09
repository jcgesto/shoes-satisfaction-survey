import { Body, Controller, ForbiddenException, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerEventRequest } from './customer-event-request';

const authorizationHeaderKey = 'Authorization'
const mockedAccessToken = 'Bearer fake_access_token'

@Controller('events')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  create(
    @Body() customerEventRequest: CustomerEventRequest,
    @Headers(authorizationHeaderKey) authenticationHeader: string): Promise<any> {
    if (!this.isAuthenticated(authenticationHeader)) {
      throw new ForbiddenException()
    }
    return this.appService.proccess(customerEventRequest)
  }

  private isAuthenticated(authenticationHeader: string) {
    return authenticationHeader === mockedAccessToken
  }
}