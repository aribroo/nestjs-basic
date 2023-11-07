import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('api')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  async getAllBooks(): Promise<{ data: Book[] }> {
    const result = await this.bookService.findAll();
    return { data: result };
  }

  @Get('book/:id')
  async getBookById(@Param('id') id: string): Promise<{ data: Book }> {
    const result = await this.bookService.findOne(id);
    return { data: result };
  }

  @Post('book')
  async createBook(@Body() body: CreateBookDto): Promise<{ data: Book }> {
    const result = await this.bookService.create(body);
    return { data: result };
  }

  @Patch('book/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: UpdateBookDto,
  ): Promise<any> {
    return this.bookService.update(id, body);
  }

  @Delete('book/:id')
  async deleteBook(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.bookService.delete(id);
    return res.json({ data: result });
  }
}
