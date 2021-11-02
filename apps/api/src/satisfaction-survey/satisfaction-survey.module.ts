import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarketingCloudAuthenticationService as MarketingCloudAuthenticationService } from './application/marketing-cloud-authentication.service'
import { MarketingCloudEventClientService } from './application/marketing-cloud-event-client.service'
import { SatisfactionSurveyService } from './application/satisfaction-survey.service'
import { SatisfactionSurveyEntity } from './domain/satisfaction-survey.entity'
import { SatisfactionSurveyController } from './infrastructure/satisfaction-survey.controller'
import { TypeOrmSatisfactionSurveyRepository } from './infrastructure/typeorm-satisfaction-survey.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SatisfactionSurveyEntity
    ]),
    HttpModule
  ],
  controllers: [
    SatisfactionSurveyController
  ],
  providers: [
    SatisfactionSurveyService,
    {
      provide: 'ISatisfactionSurveyRepository',
      useClass: TypeOrmSatisfactionSurveyRepository
    },
    MarketingCloudEventClientService,
    MarketingCloudAuthenticationService
  ]
})
export class SatisfactionSurveyModule {}
