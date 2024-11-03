import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface EnrollmentAttributes {
  id: number;
  studentId: number;
  classId: number;
  enrollmentDate: Date;
  paymentStatus: "paid" | "unpaid";

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
  public studentId!: number;
  public classId!: number;
  public enrollmentDate!: Date;
  public paymentStatus!: "paid" | "unpaid";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Enrollment.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });
    Enrollment.belongsTo(models.Class, { foreignKey: "classId", as: "class" });
  }
}

module.exports = (sequelize: Sequelize) => {
  Enrollment.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Students",
          key: "id",
        },
      },
      classId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Classes",
          key: "id",
        },
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "unpaid"),
        allowNull: false,
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
