import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {join} from 'path'
import { UserModule } from './user/user.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
