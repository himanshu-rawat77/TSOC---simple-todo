import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LogInDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description: 'Register a new user', summary: 'Register a new User' })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }


  @Post('login')
  @ApiOperation({ description: 'Login with email', summary: 'Endpoint to login with user email and password' })
  Login(@Body() loginData:LogInDto){
    return this.authService.login(loginData)
  }
}
