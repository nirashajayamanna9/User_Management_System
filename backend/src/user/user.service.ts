import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
   
 getAllUsers() {
    return this.userRepository.find();
  }

  
  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
 createUser(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

async updateUser(id: number, updatedUser: Partial<User>) {
    const user = await this.getById(id);

    Object.assign(user, updatedUser);

    return this.userRepository.save(user);
  }

 
  async deleteUser(id: number) {
    const user = await this.getById(id);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
