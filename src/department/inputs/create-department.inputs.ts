import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SubDepartmentInput {
  @Field()
  @IsString()
  @Length(2)
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @Length(2)
  name: string;

  @Field(() => [SubDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentInput)
  subDepartments?: SubDepartmentInput[];
}
