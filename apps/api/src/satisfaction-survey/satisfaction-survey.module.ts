import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SatisfactionSurveyService } from './application/satisfaction-survey.service'
import { SatisfactionSurveyEntity } from './domain/satisfaction-survey.entity'
import { SatisfactionSurveyController } from './infrastructure/satisfaction-survey.controller'
import { TypeOrmSatisfactionSurveyRepository } from './infrastructure/typeorm-satisfaction-survey.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SatisfactionSurveyEntity
    ])
  ],
  controllers: [
    SatisfactionSurveyController
  ],
  providers: [
    SatisfactionSurveyService,
    {
      provide: 'ISatisfactionSurveyRepository',
      useClass: TypeOrmSatisfactionSurveyRepository
    }
  ]
})
export class SatisfactionSurveyModule {}
