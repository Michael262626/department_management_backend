import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { MoreThan, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
      ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const hashed = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.createUser(registerDto.username, registerDto.email, hashed);
    return this.generateTokens(user);
  }
  async sendResetLink({ email }: ForgotPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email } })

    if (!user) throw new NotFoundException('User not found')

    const token = crypto.randomBytes(32).toString('hex')
    user.resetToken = token
    user.resetTokenExpiry = new Date(Date.now() + 3600000)
    await this.userRepo.save(user)

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset',
      template: './reset-password', 
      text: `Hello ${user.username},\n\nClick the link below to reset your password:\n${resetUrl}`,
      context: { name: user.username, resetUrl },
    })

    return { message: 'Reset link sent' }
  }

  async resetPassword({ token, password }: ResetPasswordDto) {
    const user = await this.userRepo.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: MoreThan(new Date()),
      },
    })

    if (!user) throw new BadRequestException('Invalid or expired token')

    user.password = await bcrypt.hash(password, 10)
    user.resetToken = ""
    user.resetTokenExpiry = new Date();

    await this.userRepo.save(user)

    return { message: 'Password successfully reset' }
  }


  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: '15m',
        }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }
}
