/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from '../user/model/user.scheme';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateHash, compareHash } from 'src/shared/helpers/handleBcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly event: EventEmitter2,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
    // @Inject('MAIL_SERVICE') private readonly clientMailService:ClientProxy
  ) {}
  // async createUser(createAuthDto: RegisterAuthDto) {
  //   const { password, ...userDetails } = createAuthDto;
  //   const hashedPassword = await generateHash(password);

  //   const newUser = await this.userModel.create({
  //     ...userDetails,
  //     password: hashedPassword
  //   });

  //   // send email

  //   const payload = { id: newUser._id };
  //   const token = this.jwtService.sign(payload);
  //   newUser.password = undefined;

  //   return { user: newUser, token };
  // }

  async createUser(createAuthDto: RegisterAuthDto) {
    const { password, email, ...userDetails } = createAuthDto;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await generateHash(password);
    const user = {
      ...userDetails,
      email,
      password: hashedPassword
    };

    const newUser = await this.userModel.create(user);
    this.event.emit('user.created', newUser);
    // this.clientMailService.emit('user.created', newUser);

    // Omitir el password en la respuesta
    newUser.password = undefined;
    return newUser;
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const userExist = await this.userModel.findOne({ email }).exec();

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await compareHash(password, userExist.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const userObject = userExist.toObject();
    delete userObject.password;

    const payload = { id: userObject._id };
    const token = this.jwtService.sign(payload);
    this.event.emit('user.login', userObject);
    return { token, user: userObject };
  }
}
