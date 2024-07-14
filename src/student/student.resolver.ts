import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { StudentType } from "./types/student.type";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./inputs/create-student.input";
import { Student } from "./entities/student.entity";


@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Query(returns => [StudentType])
    async getStudents(): Promise<Student[]> {
        return await this.studentService.getStudents();
    }

    @Query(returns => StudentType)
    async getStudentById( @Args('id') id: string): Promise<Student> {
        return await this.studentService.getStudentById(id);
    }

    @Mutation(returns => StudentType)
    async createStudent( @Args('createStudentInput') createStudentInput: CreateStudentInput) : Promise<Student> {
        return await this.studentService.createStudent(createStudentInput);
    }
}