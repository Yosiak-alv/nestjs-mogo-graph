import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

@InputType()
export class LessonInput {

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @Field()
    name: string;

    @IsDateString()  
    @Field()
    startDate: string;
    
    @IsDateString()    
    @Field()
    endDate: string;

    @IsUUID("4", { each: true })
    @Field(type => [ID], {defaultValue: []})
    students: string[];
}