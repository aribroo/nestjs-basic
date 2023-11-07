import { Category } from '../schemas/book.schema';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsEnum(Category)
  readonly category: Category;
}
