import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.name) {
      user.updateName(dto.name);
    }
    if (dto.email) {
      user.updateEmail(dto.email);
    }

    return await this.userRepository.save(user);
  }
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}
