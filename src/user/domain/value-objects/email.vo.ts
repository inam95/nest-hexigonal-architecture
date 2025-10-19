export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    return value.includes('@');
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
