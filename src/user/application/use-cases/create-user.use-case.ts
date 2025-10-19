import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = User.create(dto.email, dto.name);
    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.getId().getValue(),
      email: savedUser.getEmail().getValue(),
      name: savedUser.getName(),
      createdAt: savedUser.getCreatedAt(),
      updatedAt: savedUser.getUpdatedAt(),
      accountAge: savedUser.getAccountAge(),
    };
  }
}

export interface CreateUserDto {
  email: string;
  name: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  accountAge: number;
}
