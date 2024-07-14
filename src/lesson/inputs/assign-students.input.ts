import { InputType, Field, ID } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class AssignStudentsInput {

    @IsUUID()
    @IsNotEmpty()
    @Field(type => ID)
    lessonId: string;
    
    @IsUUID("4", { each: true })
    @IsNotEmpty({ each: true })
    @Field(Type => [ID])
    studentIds: string[];
}