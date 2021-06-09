import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepHealth extends Model {
  readonly _id: string;
  readonly hlth_dentist: string;
  readonly hlth_doctor: string;
  readonly hlth_pharmacy: string;
  readonly hlth_rehab: string;
  readonly hlth_dialysis: string;
  readonly hlth_hospital: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepHealthQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepHealth;
};

export const DeepHealthQuestions = function (sequelize: Sequelize) {
  return <TDeepHealthQuestionsStatic>sequelize.define(
    "health_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      hlth_dentist: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hlth_doctor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hlth_pharmacy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hlth_rehab: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hlth_dialysis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hlth_hospital: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "health_dqs",
    }
  );
};
