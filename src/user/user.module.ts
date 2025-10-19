import { Module } from '@nestjs/common';
import { CommandHandlers } from './application/commands/handlers';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { QueryHandlers } from './application/queries/handlers';
import { UserRepository } from './infrastructure/adapters/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
