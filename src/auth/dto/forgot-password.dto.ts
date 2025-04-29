import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// forgot-password.dto.ts
export class ForgotPasswordDto {
    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    @IsString()
    email: string
  }
  