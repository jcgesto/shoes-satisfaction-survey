import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { SatisfactionSurveyEntity } from '../domain/satisfaction-survey.entity'
import { CreateSatisfactionSurveyDto } from '../infrastructure/create-satisfaction-survey.dto'
import { SatisfactionSurveyService } from './satisfaction-survey.service'

describe('SatisfactionSurveyService', () => {
  
  describe('create', () => {
    
    it('Should check if the email has already been used', async () => {

      const satisfactionSurveyRepository = {
        getByEmail: jest.fn(() => Promise.resolve({}))
      }

      const customerEventPublisher = {
        publish: jest.fn(() => Promise.resolve({}))
      }

      const satisfactionSurveyService = new SatisfactionSurveyService(
        satisfactionSurveyRepository as any,
        customerEventPublisher as any
      )

      try {
        await satisfactionSurveyService.create({
          email: 'email@email.com',
          lastname: 'lastname',
          name: 'name',
          score: 5
        })
      } catch (error) {
        expect(error).toEqual(new ConflictException('Email already submitted'))
      }
    })
    
    it('Should throw exception if the name is Luis', async () => {

      const satisfactionSurveyRepository = {
        getByEmail: jest.fn(() => Promise.resolve(null))
      }

      const customerEventPublisher = {
        publish: jest.fn(() => Promise.resolve({}))
      }

      const satisfactionSurveyService = new SatisfactionSurveyService(
        satisfactionSurveyRepository as any,
        customerEventPublisher as any
      )

      try {
        await satisfactionSurveyService.create({
          email: 'email@email.com',
          lastname: 'lastname',
          name: 'Luis',
          score: 5
        })
      } catch (error) {
        expect(error).toEqual(new InternalServerErrorException())
      }

    })

    it('Should publish the expected information', async () => {

      const createSatisfactionSurveyDto: CreateSatisfactionSurveyDto = {
        email: 'email@email.com',
        lastname: 'lastname',
        name: 'Juan',
        score: 5
      }

      const satisfactionSurveyEntity = new SatisfactionSurveyEntity()
      satisfactionSurveyEntity.email = createSatisfactionSurveyDto.email
      satisfactionSurveyEntity.lastname = createSatisfactionSurveyDto.lastname
      satisfactionSurveyEntity.name = createSatisfactionSurveyDto.name
      satisfactionSurveyEntity.score = createSatisfactionSurveyDto.score
      satisfactionSurveyEntity.discountCode = 'discount_code'
      satisfactionSurveyEntity.id = 1

      const satisfactionSurveyRepository = {
        getByEmail: jest.fn(() => Promise.resolve(null)),
        create: jest.fn((): SatisfactionSurveyEntity => satisfactionSurveyEntity)
      }

      const customerEventPublisher = {
        publish: jest.fn(() => Promise.resolve({}))
      }

      const satisfactionSurveyService = new SatisfactionSurveyService(
        satisfactionSurveyRepository as any,
        customerEventPublisher as any
      )

      const satisfactionSurvey = await satisfactionSurveyService.create(createSatisfactionSurveyDto)
      
      expect(satisfactionSurvey).toEqual(satisfactionSurveyEntity)
      expect(customerEventPublisher.publish).toHaveBeenCalledTimes(1)
    })
  })
})