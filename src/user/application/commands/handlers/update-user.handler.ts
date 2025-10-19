import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateUserCommand } from '../update-user.command';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../../ports/user.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(command: UpdateUserCommand) {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (command.name) {
      user.updateName(command.name);
    }
    if (command.email) {
      user.updateEmail(command.email);
    }
    return await this.userRepository.save(user);
  }
}
