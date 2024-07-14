import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017',
      database: 'school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true, // set to true to generate schema file automatically when the app starts
      driver: ApolloDriver,
      playground: true,
    }),
    LessonModule,
    StudentModule
  ],
  providers: [],
})
export class AppModule {}
