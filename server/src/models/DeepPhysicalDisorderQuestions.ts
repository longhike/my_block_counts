import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepPhysicalDisorder extends Model {
  readonly _id: string;
  readonly pd_broken_window: string
  readonly pd_eviction_notice: string
  readonly pd_vacant_residence: string
  readonly pd_vacant_store: string
  readonly pd_vacant_lots: string
  readonly pd_construction: string
  readonly pd_trash_functional_trashcan: string
  readonly pd_trash_overflowing_trashcan: string
  readonly pd_trash_loose_trash_street: string
  readonly pd_trash_loose_trash_sidewalk: string
  readonly pd_trash_vacant_lot: string
  readonly pd_trash_bulk_amount_street: string
  readonly pd_trash_bulk_amount_sidewalk: string
  readonly pd_trash_bulk_amount_other: string
  readonly pd_trash_bottles: string
  readonly pd_trash_yard_waste: string
  readonly pd_trash_sewage: string
  readonly pd_animals_rodent: string
  readonly pd_animals_stray_species: string
  readonly pd_animals_dead: string
  readonly pd_qual_life_potholes: string
  readonly pd_qual_life_graffiti: string
  readonly pd_qual_life_sidewalk_damage: string
  readonly pd_qual_life_private_warning_sign: string
  readonly pd_qual_life_police_cruising: string
  readonly pd_qual_life_police_parked: string
  readonly pd_qual_life_police_interaction: string
  readonly pd_qual_life_police_activity: string
  readonly pd_qual_life_tobacco: string
  readonly pd_qual_life_security_sign: string
  readonly pd_qual_life_vandalism: string
  readonly pd_vehicle_car_operable: string
  readonly pd_vehicle_car_inoperable: string
  readonly pd_vehicle_front_yard: string
  readonly pd_vehicle_commercial: string
  readonly pd_vehicle_trailer: string
  readonly pd_vehicle_boat: string
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepPhysicalDisorderQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepPhysicalDisorder;
};

export const DeepPhysicalDisorderQuestions = function (sequelize: Sequelize) {
  return <TDeepPhysicalDisorderQuestionsStatic>sequelize.define(
    "physical_disorder_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      pd_broken_window: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_eviction_notice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vacant_residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vacant_store: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vacant_lots: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_construction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_functional_trashcan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_overflowing_trashcan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_loose_trash_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_loose_trash_sidewalk: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_vacant_lot: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_bulk_amount_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_bulk_amount_sidewalk: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_bulk_amount_other: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_bottles: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_yard_waste: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_trash_sewage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_animals_rodent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_animals_stray_species: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_animals_dead: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_potholes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_graffiti: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_sidewalk_damage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_private_warning_sign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_police_cruising: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_police_parked: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_police_interaction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_police_activity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_tobacco: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_security_sign: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_qual_life_vandalism: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_car_operable: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_car_inoperable: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_front_yard: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_commercial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_trailer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pd_vehicle_boat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "physical_disorder_dqs",
    }
  );
};
