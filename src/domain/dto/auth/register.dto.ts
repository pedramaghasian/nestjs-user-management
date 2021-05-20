import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'John',
  })
  fname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Doe',
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
    example: 'JohnDoe!@#$',
  })
  password: string;
}
