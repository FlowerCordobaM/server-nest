/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}
  async createUser(createAuthDto: RegisterAuthDto) {
    const { password, ...userDetails } = createAuthDto;
    const hashedPassword = await generateHash(password);

    const newUser = await this.userModel.create({
      ...userDetails,
      password: hashedPassword
    });

    const payload = { id: newUser._id };
    const token = this.jwtService.sign(payload);
    newUser.password = undefined;

    return { user: newUser, token };
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

    return { token, user: userObject };
  }
}
