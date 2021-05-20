import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static comparePassword(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}
