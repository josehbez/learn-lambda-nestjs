
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class ConfirmDto extends LoginDto {

    @IsNotEmpty()
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @MaxLength(130)
    newPassword: string;
}