import { Module } from '@nestjs/common';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Module({
  imports:[JwtAuthGuard],
  controllers: [UserController],
  providers: [UserServices]
})
export class UserModule {}