import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user.command';
import { User } from '../domain/entities/user.entity';
import { GetUserQuery } from '../application/queries/get-user.query';
import { ListUserQuery } from '../application/queries/list-user.query';
import { DeleteUserCommand } from '../application/commands/delete-user.command';
import { UpdateUserCommand } from '../application/commands/update-user.command';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserCommand) {
    const command = new CreateUserCommand(request.email, request.name);
    const user = await this.commandBus.execute<CreateUserCommand, User>(
      command,
    );
    return mapUserToResponse(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const query = new GetUserQuery(id);
    const user = await this.queryBus.execute<GetUserQuery, User>(query);
    return mapUserToResponse(user);
  }

  @Get()
  async listUsers() {
    const query = new ListUserQuery();
    const users = await this.queryBus.execute<ListUserQuery, User[]>(query);
    return users.map(mapUserToResponse);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserCommand,
  ) {
    const command = new UpdateUserCommand(id, request.name, request.email);
    const user = await this.commandBus.execute<UpdateUserCommand, User>(
      command,
    );
    return mapUserToResponse(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return await this.commandBus.execute<DeleteUserCommand, void>(command);
  }
}

export const mapUserToResponse = (user: User) => {
  return {
    id: user.getId().getValue(),
    email: user.getEmail().getValue(),
    name: user.getName(),
    createdAt: user.getCreatedAt(),
    updatedAt: user.getUpdatedAt(),
  };
};
