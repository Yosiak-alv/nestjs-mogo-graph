import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentType } from "src/student/types/student.type";

@ObjectType('Lesson') // This decorator is used to define the GraphQL type name
export class LessonType { 
    
    @Field(type => ID)  
    id: string;
    
    @Field()
    name: string;
    
    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field(type => [StudentType])
    students: string[];
}