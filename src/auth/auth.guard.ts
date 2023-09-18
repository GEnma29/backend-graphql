import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/handleBcrypt';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const { email, password } = gqlContext.req.body.variables;
    const user = await this.usersService.findByEmail(email);
    const isValid = await compareHash(password, user.password);
    if (user && isValid) {
      gqlContext.user = user;
      return true;
    } else {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
