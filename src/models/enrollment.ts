import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface EnrollmentAttributes {
  id: number;
  enrollmentDate: Date;
  studentId: number;
  courseId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EnrollmentInput extends Optional<EnrollmentAttributes, "id"> {}
export interface EnrollmentOutput extends Required<EnrollmentAttributes> {}

class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentInput>
  implements EnrollmentAttributes
{
  public id!: number;
  public enrollmentDate!: Date;
  public studentId!: number;
  public courseId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Enrollment.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
    Enrollment.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
  }
}

module.exports = (sequelize: Sequelize) => {
  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Students',
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
      modelName: "Enrollment",
      timestamps: true,
      underscored: false,
    }
  );
  return Enrollment;
};
