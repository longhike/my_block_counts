import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepHousingFeatures extends Model {
  readonly _id: string;
  readonly housing_standing_structure: string;
  readonly housing_attached: string;
  readonly housing_apartment: string;
  readonly housing_single_family: string;
  readonly housing_multiple_units: string;
  readonly housing_public_housing: string;
  readonly housing_senior_housing: string;
  readonly housing_continuous_care: string;
  readonly housing_group_home: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepHousingQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepHousingFeatures;
};

export const DeepHousingQuestions = function (sequelize: Sequelize) {
  return <TDeepHousingQuestionsStatic>sequelize.define(
    "housing_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      housing_standing_structure: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_attached: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_apartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_single_family: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_multiple_units: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_public_housing: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_senior_housing: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_assisted_living: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_continuous_care: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      housing_group_home: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "housing_dqs",
    }
  );
};
