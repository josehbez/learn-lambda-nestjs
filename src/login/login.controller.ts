import { Body, Controller, Get, Post, Put, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ConfirmDto } from './dtos/confirm.dto';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

    constructor(private readonly loginService: LoginService) { }

    @Post()
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDto):
        Promise<TokenDto> {
        return this.loginService.login(loginDto)
    }

    @Put()
    async confirm(@Body(new ValidationPipe({ transform: true })) confirmDto: ConfirmDto):
        Promise<TokenDto> {
        return this.loginService.confirm(confirmDto)

    }
}