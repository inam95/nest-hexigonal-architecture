import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../application/ports/user.repository.port';

export class UserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  save(user: User) {
    this.users.set(user.getId().getValue(), user);
    return Promise.resolve(user);
  }

  findById(id: string) {
    return Promise.resolve(this.users.get(id) ?? null);
  }

  findByEmail(email: string) {
    return Promise.resolve(
      Array.from(this.users.values()).find(
        (user) => user.getEmail().getValue() === email,
      ) ?? null,
    );
  }

  findAll() {
    return Promise.resolve(Array.from(this.users.values()));
  }

  delete(id: string) {
    this.users.delete(id);
    return Promise.resolve();
  }
}
