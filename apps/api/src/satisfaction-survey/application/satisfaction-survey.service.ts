import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSatisfactionSurveyDto } from "../infrastructure/create-satisfaction-survey.dto";
import { CustomerEvent } from "../domain/customer-event";
import { ICustomerEventPublisher } from "../domain/customer-event.publisher";
import { SatisfactionSurveyEntity } from "../domain/satisfaction-survey.entity";
import { ISatisfactionSurveyRepository } from "../domain/satisfaction-survey.repository";

const errorTriggeringName = 'Luis'

@Injectable()
export class SatisfactionSurveyService {

  constructor(
    @Inject('ISatisfactionSurveyRepository') private readonly satisfactionSurveyRepository: ISatisfactionSurveyRepository,
    @Inject('ICustomerEventPublisher') private readonly customerEventPublisher: ICustomerEventPublisher
  ) { }

  getAll(): Promise<any[]> {
    return this.satisfactionSurveyRepository.getAll()
  }

  async create(createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity> {
    const previousSatisfactionSurvey = await this.satisfactionSurveyRepository.getByEmail(createSatisfactionSurveyDto.email)
    if (previousSatisfactionSurvey) {
      throw new ConflictException('Email already submitted')
    }
    if (createSatisfactionSurveyDto.name === errorTriggeringName) {
      throw new InternalServerErrorException()
    }
    const satisfactionSurvey = await this.satisfactionSurveyRepository.create(createSatisfactionSurveyDto)
    const customerEvent: CustomerEvent = {
      email: satisfactionSurvey.email,
      discountCode: satisfactionSurvey.discountCode
    }
    await this.customerEventPublisher.publish(customerEvent)
    return satisfactionSurvey
  }
}