import { Injectable } from "@nestjs/common";
import { SatisfactionSurveyEntity } from "../domain/satisfaction-survey.entity";

@Injectable()
export class SatisfactionSurveyService {

    constructor (private readonly satisfactionSurveyRepository: SatisfactionSurveyRepository) {}

    getAll(): Promise<SatisfactionSurveyDto> {}

    create(): Promise<SatisfactionSurveyDto> {
        const satisfactionSurvey = new SatisfactionSurveyEntity()
        return this.satisfactionSurveyRepository.create(satisfactionSurvey)
    }
}