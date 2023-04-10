import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ required: true, minimum: 2, maximum: 20 })
  firstName: string;
  @ApiProperty({ required: false, minimum: 2, maximum: 20 })
  lastName?: string;
  @ApiProperty({ required: true, minimum: 6, maximum: 15 })
  email: string;
  @ApiProperty({ required: true, minimum: 6, maximum: 15 })
  password: string;
}
