import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: Partial<UserModel>) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [UserModel], { name: 'user' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserModel)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
