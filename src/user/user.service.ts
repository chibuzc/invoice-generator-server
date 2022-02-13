import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './model/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}
  async create(createUserInput: Partial<UserModel>) {
    return await this.userRepository.save(createUserInput);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(userInput: Partial<UserModel>) {
    const users = await this.userRepository.find(userInput);
    if (users.length) {
      return users[0]
    } else {
      return null
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...userInput } = updateUserInput;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      return null;
    }

    await this.userRepository.update(id, userInput);
    return true;
  }
}
