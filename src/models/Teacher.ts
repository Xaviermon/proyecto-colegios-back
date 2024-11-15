import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface TeacherAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty?: string;
  availableSchedule?: string;
  role?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeacherInput extends Optional<TeacherAttributes, "id"> {}
export interface TeacherOutput extends Required<TeacherAttributes> {}

class Teacher
  extends Model<TeacherAttributes, TeacherInput>
  implements TeacherAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public specialty?: string;
  public availableSchedule?: string;
  public role?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Teacher.hasMany(models.Schedule, {
      foreignKey: "teacherId",
      as: "schedules",
    });
  }
}

module.exports = (sequelize: Sequelize) => {
  Teacher.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      specialty: {
        type: DataTypes.TEXT,
      },
      availableSchedule: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.TEXT,
        defaultValue: "Teacher",
      },
    },
    {
      sequelize,
      modelName: "Teacher",
      timestamps: true,
      underscored: false,
    }
  );
  return Teacher;
};
