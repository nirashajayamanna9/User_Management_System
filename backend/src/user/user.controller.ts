import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { CreateApplicationDto } from './DTO/create-application.dto';

@Controller('users')
export class UserController {
    constructor (
        private readonly userService:UserService,
    ){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get('applications/pending')
    getPendingApplications() {
    return this.userService.getPendingApplications();
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
    @Patch('applications/:id/approve')
    approveApplication(@Param('id') id: string) {
        return this.userService.approveApplication(Number(id));
    }
    @Patch('applications/:id/reject')
    rejectApplication(@Param('id') id: string) {
        return this.userService.rejectApplication(Number(id));
    }
    
   @Post('applications')
    submitApplication(@Body() body: CreateApplicationDto) {
    return this.userService.submitApplication(body);
    }         
}
