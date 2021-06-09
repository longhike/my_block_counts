import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepPublicTransit extends Model {
  readonly _id: string;
  readonly pt_metro_station: string;
  readonly pt_bike_lane: string;
  readonly pt_bike_rack: string;
  readonly pt_bike_share: string;
  readonly pt_rideshare: string;
  readonly pt_taxi: string;
  readonly pt_bus_shelter_bench: string;
  readonly pt_bus_bench: string;
  readonly pt_bus_shelter: string;
  readonly pt_bus_no_shelter_no_bench: string;
  readonly pt_bus_bench_condition: string;
  readonly pt_bus_shelter_condition: string;
  readonly pt_bus_stop_clarity: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepPublicTransitQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepPublicTransit;
};

export const DeepPublicTransitQuestions = function (sequelize: Sequelize) {
  return <TDeepPublicTransitQuestionsStatic>sequelize.define(
    "public_transit_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      pt_metro_station: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bike_lane: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bike_rack: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bike_share: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_rideshare: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_taxi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_shelter_bench: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_bench: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_shelter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_no_shelter_no_bench: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_bench_condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_shelter_condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pt_bus_stop_clarity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "public_transit_dqs",
    }
  );
};