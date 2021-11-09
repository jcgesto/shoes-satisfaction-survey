import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthenticationRequest } from "./authentication-request";
import { AuthenticationResponse } from "./authentication-response";

const whitelistedClientId = 'fake_client_id'
const accessToken = 'fake_access_token'
const tokenTTL = 1080

@Injectable({})
export class AppService {

  authenticate (authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> {
    if (authenticationRequest.client_id === whitelistedClientId) {
      const authenticationResponse: AuthenticationResponse = {
        access_token: accessToken,
        expires_in: tokenTTL
      }
      console.log('Authentication successful', authenticationRequest, authenticationResponse)
      return Promise.resolve(authenticationResponse)
    }
    throw new BadRequestException()
  }
}