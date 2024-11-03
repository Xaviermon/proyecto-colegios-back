import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface TeacherAttributes {
  id: number;
  firstName: string;
  lastName: string;
  specialty?: string;
  availableSchedule?: string;

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
  public specialty?: string;
  public availableSchedule?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Teacher.hasMany(models.Schedule, { foreignKey: 'teacherId', as: 'schedules' }); // Assuming a relationship
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
