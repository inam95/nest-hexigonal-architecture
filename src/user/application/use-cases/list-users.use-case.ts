import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.getId().getValue(),
      email: user.getEmail().getValue(),
      name: user.getName(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      accountAge: user.getAccountAge(),
    }));
  }
}
