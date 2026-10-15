import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegistrationApplication } from '../registration-applications/registration-applications.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(RegistrationApplication)
    private readonly applicationRepository: Repository<RegistrationApplication>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
    });
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
  async submitApplication(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    const name = data.name?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;
    const role = data.role;

    if (!name || !email || !password) {
      throw new BadRequestException(
        'Name, email and password are required',
      );
    }

    if (!['User', 'Manager'].includes(role)) {
      throw new BadRequestException(
        'Role must be User or Manager',
      );
    }

    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new BadRequestException(
        'This email already has an account',
      );
    }

    const existingApplication = await this.applicationRepository.findOne({
      where: { email, status: 'Pending' },
    });

    if (existingApplication) {
      throw new BadRequestException(
        'A pending application already exists for this email',
      );
    }

    const application = this.applicationRepository.create({
      name,
      email,
      password,
      requestedRole: role,
      status: 'Pending',
    });

    const savedApplication =
        await this.applicationRepository.save(application);

      return {
        message: 'Registration application submitted successfully',
        application: {
          id: savedApplication.id,
          name: savedApplication.name,
          email: savedApplication.email,
          role: savedApplication.requestedRole,
          status: savedApplication.status,
        },
      };
    }
    async getPendingApplications() {
    return this.applicationRepository.find({
      where: {
        status: 'Pending',
      },
      select: {
        id: true,
        name: true,
        email: true,
        requestedRole: true,
        status: true,
        createdAt: true,
      },
    });
  }
  
async approveApplication(id: number) {
  const application = await this.applicationRepository.findOneBy({
      id,
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== 'Pending') {
      throw new BadRequestException(
        'Application is not pending',
      );
    }

    const existingUser = await this.userRepository.findOneBy({
      email: application.email,
    });

    if (existingUser) {
      throw new BadRequestException(
        'This email already has an account',
      );
    }

    const newUser = this.userRepository.create({
      name: application.name,
      email: application.email,
      password: application.password,
      role: application.requestedRole,
    });

    await this.userRepository.save(newUser);

    application.status = 'Approved';
    await this.applicationRepository.save(application);

    return {
      message: 'Application approved successfully',
    };
  }
  async rejectApplication(id: number) {
    const application = await this.applicationRepository.findOneBy({
        id,
      });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      if (application.status !== 'Pending') {
        throw new BadRequestException(
          'Application is not pending',
        );
      }
      application.status = 'Rejected';
      
      await this.applicationRepository.save(application);

      return {
        message: 'Application rejectted',
      };
    }

  
}