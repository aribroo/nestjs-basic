import { Category } from '../schemas/book.schema';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  MinLength,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsEnum(Category)
  readonly category?: Category;
}
