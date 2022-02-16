import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import {
  CreateUserInput,
  CreateUserOutput,
  LoginUserInput,
  LoginUserOutput,
} from './dto/create-user.input';
import { getErrorCode } from 'src/errors';
import { errorName } from 'src/errors/errorConstants';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './authGuard';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  JWT_SECRET = process.env.JWT_SECRET;

  @Mutation(() => CreateUserOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { email } = createUserInput;
    try {
      const existingUser = await this.userService.findOne({ email });
      if (existingUser) {
        const error = getErrorCode(errorName.UNAUTHORIZED);

        throw Error(error);
      } else {
        createUserInput.password = await hash(createUserInput.password, 13);
        const user = await this.userService.create(createUserInput);
        const { password, ...userInfo } = user;

        return {
          ...userInfo,
          accessToken: sign({ userId: user.id }, this.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          }),
        };
      }
    } catch (e) {
      console.log(e);
      const error = getErrorCode(errorName.SERVER_ERROR);

      throw Error(error);
    }
  }

  // for admin only
  @Query(() => [UserModel])
  @UseGuards(new AuthGuard())
  async users(@Context('authInfo') authInfo) {
    console.log(authInfo);
    return await this.userService.findAll();
  }

  @Query(() => UserModel)
  async user(@Args('id') id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    } else {
      return user;
    }
  }

  @Mutation(() => Boolean)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const isUpdated = await this.userService.update(updateUserInput);
    if (!isUpdated) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    }
    return true;
  }

  @Query(() => LoginUserOutput)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userService.findOne({ email });
    if (!user) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const error = getErrorCode(errorName.NOT_FOUND);
        throw Error(error);
      } else {
        const accessToken = jwt.sign({ id: user.id }, this.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          accessToken,
        };
      }
    }
  }
}
