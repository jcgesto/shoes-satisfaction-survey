import { HttpService, Injectable } from "@nestjs/common";
import { environment } from "../../environments/environment";

const grantType = 'client_credentials'

@Injectable()
export class MarketingCloudAuthenticationService {

  private accessToken: string = null
  private expiresAt: number = null
  private url = `${environment.marketingCloudAuthApiBaseUri}/v2/token`

  constructor(private readonly httpService: HttpService) {}

  async getToken() {
    if (!this.isAuthenticated()) {
      console.log('Token expired or not present, getting a new one')
      await this.authenticate()
    }
    return this.accessToken
  }

  private isAuthenticated() {
    return this.accessToken && !this.isTokenExpired()
  }

  private async authenticate() {
    const response = await this.httpService.post(this.url, {
      grant_type: grantType,
      client_id: environment.clientId,
      client_secret: environment.clientSecret
    }).toPromise()
    this.accessToken = response?.data['access_token']
    console.log('token', response.data)
    const expiresIn = response?.data['expires_in']
    console.log('expi', expiresIn)
    this.expiresAt = this.getExpirationDate(expiresIn)
  }

  getExpirationDate (expiresInSeconds: number): number {
    return new Date(Date.now() + (expiresInSeconds * 1000)).getTime()
  }

  isTokenExpired () {
    return Date.now() >= this.expiresAt
  }
}