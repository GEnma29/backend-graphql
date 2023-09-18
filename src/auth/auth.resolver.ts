import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { User } from 'src/graphql';
import * as jwt from 'jsonwebtoken';
import { AuthServices } from './auth.services';
@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authServices: AuthServices) {}
  @Query('login')
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    this.authServices.userLogin(email, password);
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    return {
      message: 'User Authenticated',
      token: jwt.sign(payload, 'key', { expiresIn: '1h' }),
    };
  }
  @Query('logout')
  async logout(@Args({ name: 'email', type: () => String }) email: string) {
    await this.authServices.userLogout(email);
    return {
      message: 'User Logged Out',
    };
  }
}
