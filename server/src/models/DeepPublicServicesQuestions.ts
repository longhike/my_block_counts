import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepPublicServices extends Model {
  readonly _id: string;
  readonly ps_fire_station: string;
  readonly ps_police_station: string;
  readonly ps_jail_or_prison: string;
  readonly ps_public_library: string;
  readonly ps_municipal_building: string;
  readonly ps_public_park_sign: string;
  readonly ps_public_park_condition: string;
  readonly ps_bike_trails: string;
  readonly ps_centers: string;
  readonly ps_vfw_american_legion: string;
  readonly ps_soup_kitchen: string;
  readonly ps_shelter: string;
  readonly ps_historic: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepPublicServicesQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepPublicServices;
};

export const DeepPublicServicesQuestions = function (sequelize: Sequelize) {
  return <TDeepPublicServicesQuestionsStatic>sequelize.define(
    "public_services_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      ps_fire_station: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_police_station: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_jail_or_prison: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_public_library: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_municipal_building: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_public_park_sign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_public_park_condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_bike_trails: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_centers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_vfw_american_legion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_soup_kitchen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_shelter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ps_historic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "public_services_dqs",
    }
  );
};
