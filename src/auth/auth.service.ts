import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice : DatabaseService,
    private readonly jwtService : JwtService
  ) {}


  async login(loginData : LoginDto){
    

    const {email, password} = loginData;
    const user = await this.dataservice.user.findFirst({
      where:{
        email:email
      }
  })
  if(!user){
    throw new NotFoundException('User not found')
  }
  const validatePAssword = await bcrypt.compare(password, user.password)
  if(!validatePAssword){
    throw new NotFoundException('Invalid password')
  }
  return {
    token : this.jwtService.sign({email}),
  }
}

  async register(registerData : RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where:{
        email : registerData.email
    }
    })
    if(user){
      throw new BadGatewayException('User already exists')
    }
    registerData.password = await bcrypt.hash(registerData.password, 10); 
    const res = await this.dataservice.user.create({data : registerData})
    return res;
  }
}
