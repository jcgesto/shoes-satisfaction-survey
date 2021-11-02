import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarketingCloudAuthenticationService as MarketingCloudAuthenticationService } from './infrastructure/marketing-cloud-authentication.service'
import { SatisfactionSurveyService } from './application/satisfaction-survey.service'
import { SatisfactionSurveyEntity } from './domain/satisfaction-survey.entity'
import { MarketingCloudCustomerEventPublisher } from './infrastructure/marketing-cloud-customer-event.publisher'
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
    {
      provide: 'ICustomerEventPublisher',
      useClass: MarketingCloudCustomerEventPublisher
    },
    MarketingCloudAuthenticationService
  ]
})
export class SatisfactionSurveyModule {}
