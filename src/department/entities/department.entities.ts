import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (dept) => dept.parent, { cascade: true })
  subDepartments?: Department[];

  @Field(() => Department, { nullable: true })
  @ManyToOne(() => Department, (dept) => dept.subDepartments, { nullable: true, onDelete: 'CASCADE' })
  parent?: Department;
}
