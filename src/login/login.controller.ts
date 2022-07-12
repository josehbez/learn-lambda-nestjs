import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
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

}