import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface StudentAttributes {
  id: number;
  name: string;
  email: string;
  grade: string;
  enrollmentData: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentAttributesInput
  extends Optional<StudentAttributes, "id"> {}
export interface StudentAttributesOutput extends Required<StudentAttributes> {}

class Student
  extends Model<StudentAttributes, StudentAttributesInput>
  implements StudentAttributes
{
  // Propiedades del modelo
  public id!: number;
  public name!: string;
  public email!: string;
  public grade!: string;
  public enrollmentData!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Student.hasMany(models.Enrollment, { foreignKey: 'studentId', as: 'enrollments' });
  }
}

module.exports = (sequelize: Sequelize) => {
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enrollmentData: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Student",
      timestamps: true,
      underscored: false,
    }
  );
  return Student;
};
