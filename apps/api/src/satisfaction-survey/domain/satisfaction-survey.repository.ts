import { CreateSatisfactionSurveyDto } from "../infrastructure/create-satisfaction-survey.dto";
import { SatisfactionSurveyEntity } from "./satisfaction-survey.entity";

export interface ISatisfactionSurveyRepository {
  getAll(): Promise<SatisfactionSurveyEntity[]>
  getByEmail(email: string): Promise<SatisfactionSurveyEntity>
  create(createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity>
}
