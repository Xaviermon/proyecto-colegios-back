import db from "../database/connect";
import { ClassInput, ClassOutput } from "../models/Class";

export const getAllClasses = async (
  page: number,
  limit: number
): Promise<{
  data: ClassOutput[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> => {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Find all classes with pagination
  const result = await db.Class.findAndCountAll({
    limit,
    offset,
  });
  const classes = result.rows;
  const totalCount = result.count;

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: classes,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createClass = async (
  data: ClassInput
): Promise<ClassOutput | { message: string }> => {
  if (!data.classType) {
    return { message: "Class type is required" };
  }

  const existingClass = await db.Class.findOne({
    where: { classType: data.classType },
  }); // Check existence by classType (optional)
  if (existingClass) {
    return { message: `Class with type "${data.classType}" already exists` };
  }

  const newClass = await db.Class.create(data);
  return newClass;
};

export const updateClass = async (
  id: number,
  data: Partial<ClassInput>
): Promise<ClassOutput | { message: string }> => {
  const classToUpdate = await db.Class.findByPk(id);
  if (!classToUpdate) {
    return { message: `Class with ID ${id} not found` };
  }

  try {
    await classToUpdate.update(data);
    return await db.Class.findByPk(id); // Return the updated class object
  } catch (error) {
    return { message: `Failed to update class with ID ${id}` };
  }
};

export const deleteClass = async (id: number): Promise<{ message: string }> => {
  try {
    const deletedCount = await db.Class.destroy({ where: { id } });
    if (deletedCount === 0) {
      return { message: `Class with ID ${id} not found` };
    }

    return { message: "Class deleted successfully" };
  } catch (error) {
    return { message: `Failed to delete class with ID ${id}` };
  }
};
