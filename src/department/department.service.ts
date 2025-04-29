import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entities';
import { CreateDepartmentInput } from './inputs/create-department.inputs';
import { UpdateDepartmentInput } from './inputs/UpdateDepartmentInput.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentRepo.create({
      name: input.name,
      subDepartments: input.subDepartments?.map((sd) => ({
        name: sd.name,
        parent: undefined,  // Set parent as undefined to prevent circular references.
      })),
    });
    return this.departmentRepo.save(department);
  }

  async findAll(): Promise<any[]> {
    const departments = await this.departmentRepo.find({
      relations: ['subDepartments'], // Load subDepartments
    });
  
    return departments
      .map(department => ({
        id: department.id,
        name: department.name,
        subDepartments: department.subDepartments && department.subDepartments.length > 0
          ? department.subDepartments.map(subDepartment => ({
              id: subDepartment.id,
              name: subDepartment.name,
            }))
          : [],
      }))
      .filter(department => department.subDepartments.length > 0 || !department.subDepartments);
  }
  

  // Update method
  async update(id: number, input: UpdateDepartmentInput): Promise<Department> {
    const department = await this.departmentRepo.findOne({
      where: { id },
      relations: ['subDepartments'],
    });
  
    if (!department) {
      throw new Error('Department not found');
    }
  
    department.name = input.name || department.name;
  
    if (input.subDepartments) {
      department.subDepartments = this.departmentRepo.create(
        input.subDepartments.map((sd) => ({
          name: sd.name,
          parent: department,
        }))
      );
    }
  
    return this.departmentRepo.save(department);
  }
  

  async delete(id: number): Promise<void> {
    const department = await this.departmentRepo.findOne({
      where: { id },
    });
    if (!department) {
      throw new Error('Department not found');
    }
    await this.departmentRepo.remove(department);
  }
  
}
