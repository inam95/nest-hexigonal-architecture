import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import {
  UpdateUserDto,
  UpdateUserUseCase,
} from '../application/use-cases/update-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Get()
  async listUsers() {
    return this.listUsersUseCase.execute();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
