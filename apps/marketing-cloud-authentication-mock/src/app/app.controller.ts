import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationRequest } from './authentication-request';
import { AuthenticationResponse } from './authentication-response';

@Controller('token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  create(@Body() authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> {
    return this.appService.authenticate(authenticationRequest)
  }
}