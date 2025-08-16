import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Datos incompletos');
      }

      const userDb = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!userDb) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (!userDb.isActive) {
        throw new ForbiddenException(
          'El usuario no se encuentra habilitado para ingresar.',
        );
      }

      const passwordMatch = await bcrypt.compare(password, userDb.password);
      if (!passwordMatch) {
        throw new BadRequestException('Credenciales incorrectas');
      }

      const userPayload = {
        id: userDb.id,
        email: userDb.email,
      };

      const userWithoutPassword = {
        ...userDb,
        password: undefined,
      };

      const token = this.jwtservice.sign(userPayload);
      return {
        success: 'Usuario logueado',
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      console.error('Error en el servidor:', error);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async signup(user) {
    const userEmail = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userEmail) {
      throw new BadRequestException(`El usuario ya existe ${user.email}`);
    }
    user.password = await bcrypt.hash(user.password, 10);
    user.isActive = true;
    return await this.prisma.user.create({
      data: user,
    });
  }

  async authRegister(userData: any) {
    const validar = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (validar) {
      return await this.signIn(userData.email, userData.password);
    }

    return this.prisma.user.create({
      data: userData,
    });
  }
}
