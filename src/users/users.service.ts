import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}
  register(registerUserDto: RegisterUserDto) {
    const user = new User();
    user.firstName = registerUserDto.firstName;
    user.lastName = registerUserDto.lastName;
    user.email = registerUserDto.email;
    user.password = registerUserDto.password;
    return new this.usersModel(user).save();
  }
  findOneByEmail(email: string) {
    return this.usersModel.findOne({ email: email });
  }
}
