import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './inputs/create-student.input';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ) {}

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async getStudentById(id: string): Promise<Student> {
        return await this.studentRepository.findOneBy({id});
    }

    async createStudent(createStundentInput: CreateStudentInput): Promise<Student> {
        const student = this.studentRepository.create({id: uuid4(), ...createStundentInput});   
        return await this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        const students = await this.studentRepository.find({
            where: {
                id: In(studentIds) //this doesnt work, it should be returning the students with the ids in the studentIds array TODO
            }
        });
        console.log(students);
        return students;
    }
}
