import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '654789',
  })
  verificationCode: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'pedram@yahoo.com',
  })
  email: string;
}
