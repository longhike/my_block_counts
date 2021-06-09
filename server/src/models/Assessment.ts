import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IAssessment extends Model {
  readonly _id: string;
  readonly st_address: string;
  readonly coordinates: string;
  readonly weather: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user_id: string;
}

export type TAssessmentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAssessment;
};

export const Assessment = function (sequelize: Sequelize) {
  return <TAssessmentStatic>sequelize.define(
    "assessment",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      st_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coordinates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weather: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "assessments",
    }
  );
};
