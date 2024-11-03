import { Sequelize, Model, DataTypes, Optional } from "sequelize";
export interface ClassAttributes {
  id: number;
  classType: "private" | "group";
  duration: string; // Consider using a more appropriate type for interval
  sessionsPerMonth: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClassInput extends Optional<ClassAttributes, "id"> {}
export interface ClassOutput extends Required<ClassAttributes> {}

class Class
  extends Model<ClassAttributes, ClassInput>
  implements ClassAttributes
{
  public id!: number;
  public classType!: "private" | "group";
  public duration!: string; // Interval as string
  public sessionsPerMonth!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Class.hasMany(models.Schedule, { foreignKey: "classId", as: "schedules" });
    Class.hasMany(models.Enrollment, {
      foreignKey: "classId",
      as: "enrollments",
    });
  }
}

module.exports = (sequelize: Sequelize) => {
  Class.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      classType: {
        type: DataTypes.ENUM("private", "group"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING, // Change to appropriate type as needed
        allowNull: false,
      },
      sessionsPerMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 8, 10, 12]],
        },
      },
    },
    {
      sequelize,
      modelName: "Class",
      timestamps: true,
      underscored: false,
    }
  );
  return Class;
};
