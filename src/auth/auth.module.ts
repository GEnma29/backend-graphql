import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthServices } from './auth.services';
@Module({
  imports: [UsersModule],
  providers: [AuthGuard, AuthResolver, AuthServices],
})
export class AuthModule {}
