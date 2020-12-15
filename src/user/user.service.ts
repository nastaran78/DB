import { Injectable } from '@nestjs/common';
import UserEntity from '../db/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/book.entity';
import {getConnection} from "typeorm";

export type User = any;

@Injectable()
export class UserServices {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  // async findOne(username: string): Promise<UserEntity> {
  //   return UserEntity.findOne({where: {name: username}});
  // }

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {name  , password} = userDetails;
    userEntity.name = name;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof(userID));
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }
}