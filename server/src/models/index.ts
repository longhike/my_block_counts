import { Sequelize } from "sequelize";
import { TUserStatic, User } from "./User";
import { TPasswordResetStatic, PasswordReset } from "./PasswordReset";
import { Assessment, TAssessmentStatic } from "./Assessment";
import {
  DeepGeneralQuestions,
  TDeepGeneralQuestionsStatic,
} from "./DeepGeneralQuestions";
import {
  DeepHealthQuestions,
  TDeepHealthQuestionsStatic,
} from "./DeepHealthQuestions";
import {
  DeepHousingQuestions,
  TDeepHousingQuestionsStatic,
} from "./DeepHousingQuestions";
import {
  DeepIndustryQuestions,
  TDeepIndustryQuestionsStatic,
} from "./DeepIndustryQuestions";
import {
  DeepPhysicalDisorderQuestions,
  TDeepPhysicalDisorderQuestionsStatic,
} from "./DeepPhysicalDisorderQuestions";
import {
  DeepPublicServicesQuestions,
  TDeepPublicServicesQuestionsStatic,
} from "./DeepPublicServicesQuestions";
import {
  DeepPublicTransitQuestions,
  TDeepPublicTransitQuestionsStatic,
} from "./DeepPublicTransitQuestions";
import {
  DeepStoresQuestions,
  TDeepStoresQuestionsStatic,
} from "./DeepStoresQuestions";
import * as dotenv from "dotenv";
dotenv.config();

const sequelize: Sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
      }
    );

const UserModel: TUserStatic = User(sequelize);
const PasswordResetModel: TPasswordResetStatic = PasswordReset(sequelize);
const AssessmentModel: TAssessmentStatic = Assessment(sequelize);
const DeepGeneralQuestionsModel: TDeepGeneralQuestionsStatic =
  DeepGeneralQuestions(sequelize);
const DeepHealthQuestionsModel: TDeepHealthQuestionsStatic =
  DeepHealthQuestions(sequelize);
const DeepHousingQuestionsModel: TDeepHousingQuestionsStatic =
  DeepHousingQuestions(sequelize);
const DeepIndustryQuestionsModel: TDeepIndustryQuestionsStatic =
  DeepIndustryQuestions(sequelize);
const DeepPhysicalDisorderQuestionsModel: TDeepPhysicalDisorderQuestionsStatic =
  DeepPhysicalDisorderQuestions(sequelize);
const DeepPublicServicesQuestionsModel: TDeepPublicServicesQuestionsStatic =
  DeepPublicServicesQuestions(sequelize);
const DeepPublicTransitQuestionsModel: TDeepPublicTransitQuestionsStatic =
  DeepPublicTransitQuestions(sequelize);
const DeepStoresQuestionsModel: TDeepStoresQuestionsStatic =
  DeepStoresQuestions(sequelize);

UserModel.hasMany(AssessmentModel, { foreignKey: "user_id" });

UserModel.hasMany(PasswordResetModel, { foreignKey: "user_id" });

PasswordResetModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

AssessmentModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

AssessmentModel.hasOne(DeepGeneralQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepHealthQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepHousingQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepIndustryQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepPhysicalDisorderQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepPublicServicesQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepPublicTransitQuestionsModel, {
  foreignKey: "assessment_id",
});

AssessmentModel.hasOne(DeepStoresQuestionsModel, {
  foreignKey: "assessment_id",
});

DeepGeneralQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepHealthQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepHousingQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepIndustryQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepPhysicalDisorderQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepPublicServicesQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepPublicTransitQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

DeepStoresQuestionsModel.belongsTo(AssessmentModel, {
  foreignKey: "assessment_id",
  onDelete: "cascade",
});

const db = {
  sequelize,
  UserModel,
  PasswordResetModel,
  AssessmentModel,
  DeepGeneralQuestionsModel,
  DeepHealthQuestionsModel,
  DeepHousingQuestionsModel,
  DeepIndustryQuestionsModel,
  DeepPhysicalDisorderQuestionsModel,
  DeepPublicServicesQuestionsModel,
  DeepPublicTransitQuestionsModel,
  DeepStoresQuestionsModel,
};

export default db;
export {
  TDeepGeneralQuestionsStatic,
  TDeepHealthQuestionsStatic,
  TDeepHousingQuestionsStatic,
  TDeepIndustryQuestionsStatic,
  TDeepPhysicalDisorderQuestionsStatic,
  TDeepPublicServicesQuestionsStatic,
  TDeepPublicTransitQuestionsStatic,
  TDeepStoresQuestionsStatic,
};
