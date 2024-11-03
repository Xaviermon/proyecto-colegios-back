import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  contactDetails?: string;
  classType: 'private' | 'group';

  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentInput extends Optional<StudentAttributes, "id"> { }
export interface StudentOutput extends Required<StudentAttributes> { }

class Student
  extends Model<StudentAttributes, StudentInput>
  implements StudentAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public contactDetails?: string;
  public classType!: 'private' | 'group';

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
      contactDetails: {
        type: DataTypes.TEXT,
      },
      classType: {
        type: DataTypes.ENUM('private', 'group'),
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
