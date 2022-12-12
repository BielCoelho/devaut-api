import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { AuthUserInput, CreateUserInput } from '../../inputs/user.inputs';
import { UserWithToken } from '../../models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private generateUserToken(userId: string) {
    return sign({}, process.env.TOKEN_SECRET, {
      subject: userId,
      expiresIn: '1d',
    });
  }

  private async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const passwordIsValid = await this.validatePassword(password, user.password);

    if (!passwordIsValid) throw new BadRequestException('Invalid credentials');

    delete user.password;

    return { user, token: this.generateUserToken(user.id) } as UserWithToken;
  }

  async create({ email, name, birthday, gender, phone, password, confirmPassword }: CreateUserInput) {
    if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
      throw new BadRequestException('The passwords must be the same!');
    }

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        birthday,
        gender,
        phone,
      },
    });

    delete createdUser.password;

    return {
      token: this.generateUserToken(createdUser.id),
      user: createdUser,
    } as UserWithToken;
  }

  async auth({ email, password }: AuthUserInput) {
    return await this.validateCredentials(email, password);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async update(id: string, data: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
