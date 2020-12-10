import { Body, Controller, Get, Post } from '@nestjs/common';
import {BooksService} from './books.service';
import CreateBooksDto from './dto/create-book.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
    constructor(private readonly booksServices: BooksService) {}
    @Post('post')
    postGenre( @Body() genre: CreateBooksDto) {
      return this.booksServices.insert(genre);
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
    getAll() {
      return this.booksServices.getAllBooks();
    }



}
