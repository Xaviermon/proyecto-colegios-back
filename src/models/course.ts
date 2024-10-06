import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface CoursesAttributes {
  id: number,
  name: string,
  code: string,
  description: string

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoursesInput extends Optional<CoursesAttributes, "id"> {}
export interface CouserOutput extends Required<CoursesAttributes> {}

class Course 
  extends Model<CoursesAttributes, CoursesInput>
  implements CoursesAttributes {
    public id!: number;
    public name!: string;
    public code!: string;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

module.exports = (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Course",
      timestamps: true,
      underscored: false,
    }
  )
  return Course
}