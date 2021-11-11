import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateSatisfactionSurveyDto } from "./create-satisfaction-survey.dto"
import { SatisfactionSurveyEntity } from "../domain/satisfaction-survey.entity"
import { ISatisfactionSurveyRepository } from "../domain/satisfaction-survey.repository"

@Injectable()
export class TypeOrmSatisfactionSurveyRepository implements ISatisfactionSurveyRepository {
  
  constructor (
    @InjectRepository(SatisfactionSurveyEntity)
    private readonly repository: Repository<SatisfactionSurveyEntity>
  ) {}
  
  getAll(): Promise<SatisfactionSurveyEntity[]> {
    return this.repository.find()
  }

  async getByEmail(email: string): Promise<SatisfactionSurveyEntity> {
    return this.repository.findOne({
      where: {
        email
      }
    })
  }

  create(createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity> {
    const satisfactionSurvey = this.repository.create(createSatisfactionSurveyDto)
    return this.repository.save(satisfactionSurvey)
  }
}