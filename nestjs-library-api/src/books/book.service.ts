import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    if (books.length === 0) throw new NotFoundException('Data is empty');
    return books;
  }

  async create(book: Book): Promise<Book> {
    return this.bookModel.create(book);
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, body: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) throw new NotFoundException('Book not found');
    return this.bookModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<any> {
    const book = await this.bookModel.findById(id);

    if (!book) throw new NotFoundException('Book not found');

    const updateBook = await this.bookModel.findByIdAndDelete(id);

    if (!updateBook) throw new InternalServerErrorException();
    return 'OK';
  }
}
