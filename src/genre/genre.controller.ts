import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}
  @Post('post')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }

  @ApiResponse({ status: 200})

  @ApiQuery({
      name: 'type',
      required: true, 
      type: String
  }) 


  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.genreServices.getAllGenre();
  }
}