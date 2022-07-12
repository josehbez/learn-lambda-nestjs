import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';


export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @MaxLength(130)
    password: string;
}