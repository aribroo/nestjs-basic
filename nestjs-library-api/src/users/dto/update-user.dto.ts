import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;
}
