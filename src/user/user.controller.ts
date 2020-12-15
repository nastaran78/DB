import { Body, Controller, Get, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  @ApiResponse({ status: 200})
  
  @ApiQuery({
      name: 'name',
      required: true, 
      type: String
  }) 

  @ApiQuery({
    name: 'password',
    required: true, 
    type: String
}) 

  @ApiQuery({
      name: 'books',
      required: false, 
      type: Array
  }) 

//'postUser()' will handle the creating of new User
  
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.usersServices.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request  
  @Get('books')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getBooks( @Body('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }
}