import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [JwtAuthGuard],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
