import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// forgot-password.dto.ts
export class LoginDto {
    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    @IsString()
    username: string
    @ApiProperty({ description: 'Password of the user' })
    @IsString()
    @IsNotEmpty()
    password: string
  }
  