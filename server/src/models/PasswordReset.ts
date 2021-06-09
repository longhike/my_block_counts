import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IPasswordReset extends Model {
  readonly _id: string;
  readonly session_id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user_id: string;
}

export type TPasswordResetStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IPasswordReset;
};

export const PasswordReset = function (sequelize: Sequelize) {
  return <TPasswordResetStatic>sequelize.define(
    "password_reset",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      session_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "password_resets",
    }
  );
};
