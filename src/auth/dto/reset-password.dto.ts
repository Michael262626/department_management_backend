import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

  // reset-password.dto.ts
  export class ResetPasswordDto {
    @IsString()
    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    token: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    password: string;
  }
  