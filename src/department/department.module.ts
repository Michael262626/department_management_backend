import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
