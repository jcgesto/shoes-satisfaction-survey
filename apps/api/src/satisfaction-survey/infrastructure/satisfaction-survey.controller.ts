import { Body, Controller, Get, Post } from '@nestjs/common';

import { SatisfactionSurveyService } from '../application/satisfaction-survey.service';


@Controller()
export class SatisfactionSurveyController {
  constructor(private readonly satisfactionSurveyService: SatisfactionSurveyService) {}

  @Get('')
  getAll(): Promise<SatisfactionSurveyDto []> {
    return this.satisfactionSurveyService.getAll()
  }

  @Post('')
  create(@Body() createSatisfactionSurveyRequestDto: CreateSatisfactionSurveyRequestDto): Promise<SatisfactionSurveyDto> {
    return this.satisfactionSurveyService.create()
  }
}