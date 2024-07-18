


import {IsEmail, IsString, Length} from "class-validator";

export class RegisterUserDto{
    @IsString()
    @Length(2, 20)
    name : string;    
    
    @IsEmail()
    email : string;

    @IsString()
    @Length(6, 20)
    password : string


}