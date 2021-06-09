import { Model, DataTypes, Sequelize, BuildOptions } from "sequelize";

export interface IDeepGeneralBlockFeatures extends Model {
  readonly _id: string;
  readonly gbf_length: string;
  readonly gbf_width: string;
  readonly gbf_dead_end: string;
  readonly gbf_median: string;
  readonly gbf_sidewalks: string;
  readonly gbf_residents_percent: string;
  readonly gbf_non_residents_percent: string;
  readonly gbf_non_resident_properties_list: string;
  readonly gbf_num_streetlights: string;
  readonly gbf_num_utility_polest: string;
  readonly gbf_num_trees: string;
  readonly gbf_num_murals: string;
  readonly gbf_num_fire_hydrants: string;
  readonly gbf_num_xwalk_signals: string;
  readonly gbf_num_xwalks_no_signals: string;
  readonly gbf_num_gov_cameras: string;
  readonly gbf_num_priv_cameras: string;
  readonly gbf_num_gov_ads_promos: string;
  readonly gbf_traffic_control_num_speed_bumps: string;
  readonly gbf_traffic_control_num_noise_strips: string;
  readonly gbf_traffic_control_num_speed_limit_signs: string;
  readonly gbf_traffic_control_num_speed_monitors: string;
  readonly gbf_traffic_control_num_red_light_cameras: string;
  readonly gbf_traffic_control_num_traffic_circles: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly assessment_id: string;
}

export type TDeepGeneralQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeepGeneralBlockFeatures;
};

export const DeepGeneralQuestions = function (sequelize: Sequelize) {
  return <TDeepGeneralQuestionsStatic>sequelize.define("general_features_dq", {
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    gbf_length: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_width: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_dead_end: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_median: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_sidewalks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_residents_percent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_non_resident_properties: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_non_resident_properties_list: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_streetlights: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_utility_poles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_trees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_murals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_fire_hydrants: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_xwalk_signals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_xwalks_no_signals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_gov_cameras: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_priv_cameras: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_gov_ads_promos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_num_priv_ads_promos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_speed_bumps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_speed_humps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_noise_strips: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_speed_limit_signs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_speed_monitors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_speed_cameras: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_red_light_cameras: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gbf_traffic_control_num_traffic_circles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
    {
        tableName: "general_features_dqs",
      }
  );
};
