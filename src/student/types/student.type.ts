import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Student') // This decorator is used to define the GraphQL type name
export class StudentType {
    
    @Field(type => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    age: number;
}