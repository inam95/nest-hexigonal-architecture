import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUserQuery } from '../list-user.query';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';

@QueryHandler(ListUserQuery)
export class ListUserHandler implements IQueryHandler<ListUserQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
