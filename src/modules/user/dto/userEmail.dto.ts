import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
