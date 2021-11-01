import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSatisfactionSurveyDto } from "../domain/create-satisfaction-survey.dto";
import { SatisfactionSurveyEntity } from "../domain/satisfaction-survey.entity";
import { ISatisfactionSurveyRepository } from "../domain/satisfaction-survey.repository";

@Injectable()
export class SatisfactionSurveyService {

  constructor(
    @Inject('ISatisfactionSurveyRepository') private readonly satisfactionSurveyRepository: ISatisfactionSurveyRepository
  ) { }

  getAll(): Promise<any[]> {
    return this.satisfactionSurveyRepository.getAll()
  }

  async create(createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity> {
    const satisfactionSurvey = await this.satisfactionSurveyRepository.getByEmail(createSatisfactionSurveyDto.email)
    if (satisfactionSurvey) {
      throw new ConflictException('Email already submitted')
    }
    if (createSatisfactionSurveyDto.name === 'pepe') {
      throw new InternalServerErrorException()
    }
    return this.satisfactionSurveyRepository.create(createSatisfactionSurveyDto)
  }
}