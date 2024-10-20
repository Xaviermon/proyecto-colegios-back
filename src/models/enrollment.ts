import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface EnrollmentAttributes {
  id: number;
  enrollmentDate: Date;

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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
