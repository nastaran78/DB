import { Body, Controller, Get, Post , Delete, Put, Param, UseGuards} from '@nestjs/common';
import {TodoService} from './todo.service';
import CreateLabelDto from './dto/create-label.dto';

import CreateTaskDto from './dto/create-task.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateCategoryDto from './dto/create-category.dto';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoServices: TodoService) {}
    @Post('label')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    postLabel( @Body() label: CreateLabelDto) {
      return this.todoServices.insertLabel(label);
    }

    @Post('category')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    postCategory( @Body() category: CreateCategoryDto) {
      return this.todoServices.insertCategory(category);
    }

    @Post('item')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    postItem( @Body() item: CreateItemDto) {
      return this.todoServices.insertItem(item);
    }

      
    @ApiResponse({ status: 200})
    @ApiQuery({
        name: 'text',
        required: false, 
        type: String
    }) 

    @ApiQuery({
        name: 'labels',
        required: true
    }) 

    @ApiQuery({
      name: 'categoryId',
      required: true
  }) 

    @ApiQuery({
        name: 'items',
        required: false
    })
    @Post('task')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    postTask( @Body() task: CreateTaskDto) {
      return this.todoServices.insertTask(task);
    }


    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: Number, @Body() updateBookDto: CreateTaskDto) {
        return this.todoServices.updateTask(+id, updateBookDto);
    }

    @Delete('task:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    removeTask(@Param('id') id: Number) {
        return this.todoServices.removeTask(+id);
    }

    @Delete('item:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    removeItem(@Param('id') id: Number) {
        return this.todoServices.removeItem(+id);
    }

  
  
    @Get()
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    getAll() {
      return this.todoServices.getAllItems();
    }



}
