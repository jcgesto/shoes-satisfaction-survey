import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('satisfactionSurvey')
export class SatisfactionSurveyEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    discountCode: string
    
    @Column()
    name: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column({ nullable: true })
    notes?: string

    @Column()
    score: number

    @BeforeInsert()
    generateDiscountCode() {
      this.discountCode = (Date.now() + Math.random()).toString()
    }
}