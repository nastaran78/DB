import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Module({
  imports: [JwtAuthGuard],
  controllers: [BooksController],
  providers: [BooksService],
})
export default class BooksModule {}