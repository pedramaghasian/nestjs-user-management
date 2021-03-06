import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'pedram',
  })
  fname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'aghasian',
  })
  lname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '09120285698',
  })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'pedram@yahoo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '123456789',
  })
  password: string;
}
