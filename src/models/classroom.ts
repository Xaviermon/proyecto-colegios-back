import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface ClassRoomAttributes {
  id: number;
  name: string;
  capacity: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClassRoomInput extends Optional<ClassRoomAttributes, "id"> {}
export interface ClassRoomOutput extends Required<ClassRoomAttributes> {}

class ClassRoom
  extends Model<ClassRoomAttributes, ClassRoomInput>
  implements ClassRoomAttributes
{
  // Propiedades del modelo
  public id!: number;
  public name!: string;
  public capacity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

module.exports = (sequelize: Sequelize) => {
  ClassRoom.init(
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
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ClassRoom",
      timestamps: true,
      underscored: false,
    }
  );
  return ClassRoom;
};
