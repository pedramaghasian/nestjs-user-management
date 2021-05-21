import { Table, Model, Column, BeforeSave } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Bcrypt } from 'src/shared/helper/bcrypt';
@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    allowNull: false,
    type: DataTypes.STRING(200),
    validate: { trim: true },
  })
  fname: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(200),
    validate: { trim: true },
  })
  lname: string;

  @Column({
    unique: true,
    allowNull: false,
    type: DataTypes.STRING(50),
  })
  phone: string;

  @Column({
    unique: true,
    allowNull: false,
    type: DataTypes.STRING(100),
    validate: { trim: true },
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(255),
    validate: { trim: true },
  })
  password: string;

  @Column({
    type: DataTypes.STRING(255),
    validate: { trim: true },
  })
  expirationDate: string;

  @Column({
    type: DataTypes.STRING(6),
    validate: { trim: true },
  })
  verificationCode: string;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      const hashedPassword = await Bcrypt.hashPassword(user.password);
      user.password = hashedPassword;
    }
  }
}
