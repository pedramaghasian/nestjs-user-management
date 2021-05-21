import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'pedram@yahoo.com',
  })
  email: string;
}
