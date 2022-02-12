import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { getErrorCode } from 'src/errors';
import { errorName } from 'src/errors/errorConstants';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [UserModel])
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => UserModel)
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id);
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
}
