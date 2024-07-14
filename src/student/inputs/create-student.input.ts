import { InputType, Field } from "@nestjs/graphql";
import { IsString, MinLength, IsInt } from "class-validator";

@InputType()
export class CreateStudentInput {
    
    @IsString()
    @MinLength(3)
    @Field()
    firstName: string;

    @IsString()
    @MinLength(3)
    @Field()
    lastName: string;

    @IsInt()
    @Field()
    age: number;
}