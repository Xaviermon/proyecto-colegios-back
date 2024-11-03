import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface ScheduleAttributes {
  id: number;
  classId: number;
  dayOfWeek: string; // Can be changed to enum if preferred
  startTime: Date;
  endTime: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ScheduleInput extends Optional<ScheduleAttributes, "id"> { }
export interface ScheduleOutput extends Required<ScheduleAttributes> { }

class Schedule
  extends Model<ScheduleAttributes, ScheduleInput>
  implements ScheduleAttributes {
  public id!: number;
  public classId!: number;
  public dayOfWeek!: string; // Change to appropriate type or enum
  public startTime!: Date;
  public endTime!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Schedule.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
  }
}

module.exports = (sequelize: Sequelize) => {
  Schedule.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      classId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Classes',
          key: 'id',
        },
      },
      dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
        },
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
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
