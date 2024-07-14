import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from "./types/lesson.type";
import { LessonService } from "./lesson.service";
import { Lesson } from "./entities/lesson.entity";
import { LessonInput } from "./inputs/create-lesson.input";
import { AssignStudentsInput } from "./inputs/assign-students.input";
import { StudentService } from "src/student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService
    ) {}

    @Query(returns => [LessonType])
    async getLessons() : Promise<Lesson[]> {
        return await this.lessonService.getLessons();
    }

    @Query(returns => LessonType)
    async findLessonById(
        @Args('id') id: string
    ) : Promise<Lesson> {
        return await this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    async createLesson(
        @Args('createLessonInput') lessonInput: LessonInput
    ) : Promise<Lesson> {
        return await this.lessonService.createLesson(lessonInput);
    }   

    @Mutation(returns => LessonType)
    async assignStudentsToLesson(
        @Args('assignStudentsInput')  assignStudentsInput: AssignStudentsInput
    ) : Promise<Lesson> {
        return await this.lessonService.assignStudentsToLesson(assignStudentsInput);
    }

    //getting students object from whatever the lesson object request students
    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return await this.studentService.getManyStudents(lesson.students);
    }
}