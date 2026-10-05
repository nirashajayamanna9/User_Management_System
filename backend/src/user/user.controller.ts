import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';

@Controller('users')
export class UserController {
    constructor (
        private readonly userService:UserService,
    ){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    @Get(':id')
    getById(@Param('id') id: string){
        return this.userService.getById(Number(id));
    }
    @Post()
    createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
    }
    @Delete(':id')
    deleteUser(@Param('id')id:string){
        return this.userService.deleteUser(Number(id));
    }
    @Patch(':id')
    updateUser(@Param('id') id: string,@Body() updatedUser: UpdateUserDto,) {
        return this.userService.updateUser(
            Number(id),
            updatedUser,
        );
    }
}
