import { of } from 'rxjs'
import { MarketingCloudAuthenticationService } from './marketing-cloud-authentication.service'

describe('MarketingCloudAuthenticationService', () => {

  describe('getToken', () => {

    it('Should get a new token if no token present', async () => {

      const httpService = {
        post: jest.fn(() => of({
          data: {
            access_token: 'access_token',
            expires_in: 10
          }
        }))
      }

      const marketingCloudAuthenticationService = new MarketingCloudAuthenticationService(httpService as any)
      const token = await marketingCloudAuthenticationService.getToken()
      expect(httpService.post).toHaveBeenCalledTimes(1)
      expect(token).toEqual('access_token')
    })

    it('Should get a new token if the token is expired', async () => {

      const httpService = {
        post: jest.fn()
      }

      const marketingCloudAuthenticationService = new MarketingCloudAuthenticationService(httpService as any)

      httpService.post.mockImplementationOnce(() => of({
        data: {
          access_token: 'access_token_1',
          expires_in: 2
        }
      }))

      const firstToken = await marketingCloudAuthenticationService.getToken()

      setTimeout(async () => {
        httpService.post.mockImplementationOnce(() => of({
          data: {
            access_token: 'access_token_2',
            expires_in: 1000
          }
        }))

        const secondToken = await marketingCloudAuthenticationService.getToken()

        expect(httpService.post).toHaveBeenCalledTimes(1)
        expect(secondToken === firstToken).toBeFalsy()
      }, 3000)
    })

    it('Should not get a new token if the token is present and not expired', async () => {

      const httpService = {
        post: jest.fn()
      }

      const marketingCloudAuthenticationService = new MarketingCloudAuthenticationService(httpService as any)

      httpService.post.mockImplementationOnce(() => of({
        data: {
          access_token: 'access_token_1',
          expires_in: 1000
        }
      }))

      const firstToken = await marketingCloudAuthenticationService.getToken()

      setTimeout(async () => {
        httpService.post.mockImplementationOnce(() => of({
          data: {
            access_token: 'access_token_2',
            expires_in: 1000
          }
        }))

        const secondToken = await marketingCloudAuthenticationService.getToken()

        expect(secondToken === firstToken).toBeTruthy()
      }, 1000)
    })
  })
})