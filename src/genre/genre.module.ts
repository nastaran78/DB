import { Module } from '@nestjs/common';
import GenreServices from './genre.service';
import GenreController from './genre.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Module({
  imports: [JwtAuthGuard],
  controllers: [GenreController],
  providers: [GenreServices],
})
export default class GenreModule {}