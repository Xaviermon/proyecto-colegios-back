import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface InstructorAttributes {
  id: number,
  name: string,
  email: string,
  hireDate: Date

  createdAt?: Date;
  updatedAt?: Date;
}

export interface InstructorInput extends Optional<InstructorAttributes, "id"> {}
export interface InstructorOutput extends Required<InstructorAttributes> {}

class Teacher 
  extends Model<InstructorAttributes, InstructorInput>
  implements InstructorAttributes {
  // Propiedades del modelo
  public id!: number;
  public name!: string;
  public email!: string;
  public hireDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

module.exports = (sequelize: Sequelize) => {
  Teacher.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hireDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Instructor",
      timestamps: true,
      underscored: false,
    }
  )
  return Teacher
}