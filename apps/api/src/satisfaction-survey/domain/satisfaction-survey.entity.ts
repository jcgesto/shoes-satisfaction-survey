import { ApiProperty } from "@nestjs/swagger"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('satisfactionSurvey')
export class SatisfactionSurveyEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  discountCode: string

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  lastname: string

  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column({ nullable: true })
  notes?: string

  @ApiProperty()
  @Column()
  score: number

  @BeforeInsert()
  generateDiscountCode() {
    this.discountCode = (Date.now() + Math.random()).toString()
  }
}