import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/graphql';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/handleBcrypt';

@Injectable()
export class AuthServices {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async userLogin(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    const isValid = await compareHash(password, user.password);
    if (user && isValid) {
      await this.usersService.userLogin(user._id);
      return user;
    }
    return null;
  }
  async userLogout(email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    return await this.usersService.userLogout(user._id);
  }
}
