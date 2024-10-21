import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface SheduleAttributes {
  id: number;
  startTime: Date;
  endTime: Date;
  courseId: number;
  classRoomId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface SheduleInput extends Optional<SheduleAttributes, "id"> {}
export interface SheduleOutput extends Required<SheduleAttributes> {}

class Schedule
  extends Model<SheduleAttributes, SheduleInput>
  implements SheduleAttributes
{
  // Propiedades del modelo
  public id!: number;
  public startTime!: Date;
  public endTime!: Date;
  public courseId!: number;
  public classRoomId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Schedule.hasMany(models.ClassRoom, { foreignKey: 'classRoomId', as: 'student' });
    Schedule.hasMany(models.Course, { foreignKey: 'courseId', as: 'course' });
  }
}

module.exports = (sequelize: Sequelize) => {
  Schedule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      classRoomId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ClassRooms',
          key: 'id',
        },
      },
      courseId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: "Schedule",
      timestamps: true,
      underscored: false,
    }
  );
  return Schedule;
};
