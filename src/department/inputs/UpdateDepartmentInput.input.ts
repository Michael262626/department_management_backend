import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubDepartmentInput } from './create-department.inputs';

@InputType()
export class UpdateDepartmentInput {
  @Field()
  @IsString()
  @Length(2)
  name: string;

  @Field(() => [SubDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentInput)
  subDepartments?: SubDepartmentInput[];
}
