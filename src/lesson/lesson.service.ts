import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { LessonInput } from './inputs/create-lesson.input';
import { AssignStudentsInput } from './inputs/assign-students.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) {}

    async getLessons(): Promise<Lesson[]> {
        return await this.lessonRepository.find();
    }
    
    async getLesson(id: string): Promise<Lesson> {
        return await this.lessonRepository.findOneBy({ id });
    }

    async createLesson(lessonInput : LessonInput): Promise<Lesson> {
        const lesson = this.lessonRepository.create({id: uuid4(), ...lessonInput});
        return await this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(assignStudentInput: AssignStudentsInput): Promise<Lesson> {
        const lesson = await this.getLesson(assignStudentInput.lessonId);
        lesson.students = [...lesson.students, ...assignStudentInput.studentIds];
        return await this.lessonRepository.save(lesson);
    }
}
