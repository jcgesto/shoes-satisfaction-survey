import { satisfactionSurvey } from '@myorg/api-interfaces';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { SatisfactionSurveyService } from '../application/satisfaction-survey.service';
import { CreateSatisfactionSurveyDto } from './create-satisfaction-survey.dto';
import { SatisfactionSurveyEntity } from '../domain/satisfaction-survey.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(satisfactionSurvey)
@Controller(satisfactionSurvey)
export class SatisfactionSurveyController {
  constructor(private readonly satisfactionSurveyService: SatisfactionSurveyService) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all satisfaction surveys received',
    type: SatisfactionSurveyEntity,
    isArray: true
  })
  getAll(): Promise<SatisfactionSurveyEntity[]> {
    return this.satisfactionSurveyService.getAll()
  }

  @Post('')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Satisfaction survey created',
    type: SatisfactionSurveyEntity
  })
  create(@Body() createSatisfactionSurveyDto: CreateSatisfactionSurveyDto): Promise<SatisfactionSurveyEntity> { // dto a lib
    return this.satisfactionSurveyService.create(createSatisfactionSurveyDto)
  }
}