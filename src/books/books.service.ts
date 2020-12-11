import BookEntity from '../db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto'
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';
import BooksModule from './books.module';

export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }
  async getAllBooks(): Promise<BookEntity[] > {
    return BookEntity.find();
  }

  async remove(id: Number) {

    console.log((await BookEntity.findOne({where: {id: id}})).name);
    (await BookEntity.remove((await BookEntity.findOne({where: {id: id}}))))

  }
 
  async update(id: Number, bookDetails : UpdateBookDto){
    const { name , userID , genreIDs } = bookDetails;

    var book: BookEntity = await BookEntity.findOne({where: {id: id}});
    var user: UserEntity = await UserEntity.findOne({where: {id: userID}});

    let genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             genres.push(genre);
    }
    book.user = user;
    book.name = name;
    book.genres = genres;
    book.save();


  }
}