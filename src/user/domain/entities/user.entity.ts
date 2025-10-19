import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private id: UserId,
    private email: Email,
    private name: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(email: string, name: string): User {
    if (!name || name.trim().length < 2) {
      throw new Error(
        'Name is required and must be at least 2 characters long',
      );
    }
    return new User(
      new UserId(),
      new Email(email),
      name.trim(),
      new Date(),
      new Date(),
    );
  }

  getId(): UserId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error(
        'Name is required and must be at least 2 characters long',
      );
    }
    this.name = name.trim();
    this.updatedAt = new Date();
  }

  updateEmail(email: string): void {
    this.email = new Email(email);
    this.updatedAt = new Date();
  }

  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
