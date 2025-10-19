import { randomUUID } from 'crypto';

export class UserId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
