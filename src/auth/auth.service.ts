import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstant } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.firstName + '' + user.lastName,
      sub: user._id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstant.accessTokenDuration,
        secret: jwtConstant.accessKeySecret,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstant.refreshTokenDuration,
        secret: jwtConstant.refreshKeySecret,
      }),
    };
  }
  async refreshAccessToken(refreshToken: string): Promise<any> {
    const tokenPayload = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstant.refreshKeySecret,
    });
    if (tokenPayload) {
      return {
        accessToken: await this.jwtService.signAsync(tokenPayload, {
          expiresIn: jwtConstant.accessTokenDuration,
          secret: jwtConstant.accessKeySecret,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
