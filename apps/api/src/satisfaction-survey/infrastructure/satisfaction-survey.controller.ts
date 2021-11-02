import { satisfactionSurvey } from '@myorg/api-interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SatisfactionSurveyService } from '../application/satisfaction-survey.service';
import { CreateSatisfactionSurveyDto } from './create-satisfaction-survey.dto';
import { SatisfactionSurveyEntity } from '../domain/satisfaction-survey.entity';

@Controller(satisfactionSurvey)
export class SatisfactionSurveyController {
  constructor(private readonly satisfactionSurveyService: SatisfactionSurveyService) {}

  @Get('')
  getAll(): Promise<any []> {
    return this.satisfactionSurveyService.getAll()
  }

  @Post('')
  create(@Body() createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity> { // dto a lib
    return this.satisfactionSurveyService.create(createSatisfactionSurveyDto)
  }
}