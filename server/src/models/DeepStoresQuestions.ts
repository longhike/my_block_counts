import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IStores extends Model {
  readonly _id: string;
  readonly strs_liquor_count: string;
  readonly strs_liquor_convenience_count: string;
  readonly strs_liquor_bar_count: string;
  readonly strs_liquor_nightclub_count: string;
  readonly strs_liquor_xxx_count: string;
  readonly strs_daycare: string;
  readonly strs_restaurant_fast_food: string;
  readonly strs_restaurant_carryout: string;
  readonly strs_restaurant_pizza: string;
  readonly strs_restaurant_sit_down: string;
  readonly strs_restaurant_coffee_shop: string;
  readonly strs_gas_station: string;
  readonly strs_convenience: string;
  readonly strs_grocery: string;
  readonly strs_money_pawn: string;
  readonly strs_money_bank: string;
  readonly strs_money_check: string;
  readonly strs_money_payday: string;
  readonly strs_cellphone: string;
  readonly strs_laundry_laundromat: string;
  readonly strs_laundry_drycleaner: string;
  readonly strs_car_bodyshop: string;
  readonly strs_car_mechanic: string;
  readonly strs_car_parts: string;
  readonly strs_nail_salon: string;
  readonly strs_barbershop: string;
  readonly strs_stylist: string;
  readonly strs_tattoo: string;
  readonly strs_shoes: string;
  readonly strs_clothes: string;
  readonly strs_department: string;
  readonly strs_garage: string;
  readonly strs_thrift: string;
  readonly strs_dollar: string;
  readonly strs_used_car: string;
  readonly strs_medical: string;
  readonly strs_foodtruck: string;
  readonly strs_pushcart: string;
  readonly strs_flower_cart: string;
  readonly strs_other_store: string;
  readonly strs_other_vendor: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepStoresQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IStores;
};

export const DeepStoresQuestions = function (sequelize: Sequelize) {
  return <TDeepStoresQuestionsStatic>sequelize.define(
    "stores_dq",
    {
      _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      strs_liquor_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_liquor_convenience_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_liquor_bar_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_liquor_nightclub_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_liquor_xxx_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_daycare: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_restaurant_fast_food: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_restaurant_carryout: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_restaurant_pizza: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_restaurant_sit_down: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_restaurant_coffee_shop: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_gas_station: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_convenience: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_grocery: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_money_pawn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_money_bank: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_money_check: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_money_payday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_cellphone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_laundry_laundromat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_laundry_drycleaner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_car_bodyshop: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_car_mechanic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_car_parts: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_nail_salon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_barbershop: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_stylist: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_tattoo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_shoes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_clothes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_garage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_thrift: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_dollar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_used_car: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_medical: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_foodtruck: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_pushcart: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_flower_cart: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_other_store: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      strs_other_vendor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "stores_dqs",
    }
  );
};
