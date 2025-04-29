import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// forgot-password.dto.ts
export class RegisterDto {
    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty({ description: 'Email of the user' })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({ description: 'Password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string
  }
  