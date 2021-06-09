import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";
import * as bcrypt from "bcryptjs";

export interface IUser extends Model {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TUserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUser;
};

export const User = function (sequelize: Sequelize) {
  return <TUserStatic>sequelize.define(
    "user",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user: any) => {
          user.username = await user.username.toLowerCase().trim();
          user.email = await user.email.toLowerCase();
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        },
      },
      tableName: "users",
    }
  );
};
