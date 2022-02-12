import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.model';


@Module({
  imports:[ TypeOrmModule.forFeature([UserModel])],
  providers: [UserResolver, UserService, ]
})
export class UserModule {}
