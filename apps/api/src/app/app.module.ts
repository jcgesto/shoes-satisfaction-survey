import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SatisfactionSurveyModule } from '../satisfaction-survey/satisfaction-survey.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    SatisfactionSurveyModule
  ]
})
export class AppModule {}
