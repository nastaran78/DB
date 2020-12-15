import { Body, Controller, Get, Post , Delete, Put, Param, UseGuards} from '@nestjs/common';
import {BooksService} from './books.service';
import CreateBooksDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksServices: BooksService) {}
    @Post('post')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    postBook( @Body() genre: CreateBooksDto) {
      return this.booksServices.insert(genre);
    }


    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: Number, @Body() updateBookDto: UpdateBookDto) {
        return this.booksServices.update(+id, updateBookDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: Number) {
        return this.booksServices.remove(+id);
    }
  
    @ApiResponse({ status: 200})
  
    @ApiQuery({
        name: 'name',
        required: true, 
        type: String
    }) 

    @ApiQuery({
        name: 'userID',
        required: false, 
        type: Number
    }) 

    @ApiQuery({
        name: 'genreIDs',
        required: true, 
        type: Array
    })
  
  
    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getAll() {
      return this.booksServices.getAllBooks();
    }



}
