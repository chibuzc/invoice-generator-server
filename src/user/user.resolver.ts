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
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from './authGuard';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  JWT_SECRET = process.env.JWT_SECRET;

  @Mutation(() => CreateUserOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { email } = createUserInput;

    const existingUser = await this.userService.findOne({ email });

    if (existingUser) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'User already exists' },
        HttpStatus.FORBIDDEN,
      );
    }

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
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Boolean)
  async updateUser(
    @Context('authInfo') authInfo,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.userService.findOne({ id: authInfo.userId });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }
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
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, error: 'Invalid Credentials' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = jwt.sign({ id: user.id }, this.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return {
      accessToken,
    };
  }
}
