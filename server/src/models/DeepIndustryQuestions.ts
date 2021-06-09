import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepIndustry extends Model {
  readonly _id: string;
  readonly ind_lulu_count: string;
  readonly ind_freight_train: string;
  readonly ind_freight_train_station: string;
  readonly ind_landfill: string;
  readonly ind_hazardous_waste: string;
  readonly ind_sewage: string;
  readonly ind_brownfields: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepIndustryQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepIndustry;
};

export const DeepIndustryQuestions = function (sequelize: Sequelize) {
  return <TDeepIndustryQuestionsStatic>sequelize.define(
    "industry_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      ind_lulu_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_freight_train: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_freight_train_station: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_landfill: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_hazardous_waste: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_sewage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ind_brownfields: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "industry_dqs",
    }
  );
};
