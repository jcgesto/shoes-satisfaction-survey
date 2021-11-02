import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSatisfactionSurveyDto } from "../domain/create-satisfaction-survey.dto";
import { SatisfactionSurveyEntity } from "../domain/satisfaction-survey.entity";
import { ISatisfactionSurveyRepository } from "../domain/satisfaction-survey.repository";
import { MarketingCloudEventClientService } from "./marketing-cloud-event-client.service";

const errorTriggeringName = 'Luis'

@Injectable()
export class SatisfactionSurveyService {

  constructor(
    @Inject('ISatisfactionSurveyRepository') private readonly satisfactionSurveyRepository: ISatisfactionSurveyRepository,
    private readonly marketingCloudEventClientService: MarketingCloudEventClientService
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
    this.marketingCloudEventClientService.post(satisfactionSurvey.email, satisfactionSurvey.discountCode)
    return satisfactionSurvey
  }
}