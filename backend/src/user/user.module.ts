import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationApplication } from '../registration-applications/registration-applications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    RegistrationApplication,
  ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
