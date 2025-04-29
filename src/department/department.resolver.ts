import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Department } from './entities/department.entities';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './inputs/create-department.inputs';
import { UpdateDepartmentInput } from './inputs/UpdateDepartmentInput.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async createDepartment(@Args('input') input: CreateDepartmentInput): Promise<Department> {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  async getDepartments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)  
  async deleteDepartment(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.departmentService.delete(id);
    return true;
  }
}
