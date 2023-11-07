import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ name: string; email: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      return {
        name,
        email,
      };
    } catch (e) {
      if (e.code === 11000 && e.keyPattern.email === 1)
        throw new ConflictException('Email already registered');
      else throw new InternalServerErrorException();
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Email or password wrong!');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password wrong!');
    }

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
    });

    return { token };
  }

  async getUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<any> {
    const updateFields: { [key: string]: any } = {};

    if (body.name) updateFields.name = body.name;
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      updateFields.password = hashedPassword;
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndRemove(id);
    if (!user) throw new NotFoundException('User not found');
  }
}
