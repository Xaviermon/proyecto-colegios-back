import db from "../../database/connect";
import { StudentOutput, StudentInput } from "../../models/Student";

export const getAllStudents = async (
  page: number,
  limit: number
): Promise<{
  data: StudentOutput[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> => {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Find all students with pagination (consider including filters/sorting)
  const { rows: students, count: totalCount } =
    await db.Student.findAndCountAll({
      limit,
      offset,
    });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: students,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createStudent = async (
  data: StudentInput
): Promise<StudentOutput | { message: string }> => {
  // Consider adding validation for unique constraints (e.g., email, phone number)

  const newStudent = await db.Student.create(data);
  return newStudent;
};

export const updateStudent = async (
  id: number,
  data: Partial<StudentInput>
): Promise<StudentOutput | { message: string }> => {
  const studentToUpdate = await db.Student.findByPk(id);
  if (!studentToUpdate) {
    return { message: `Student with ID ${id} not found` };
  }

  await studentToUpdate.update(data);
  return await db.Student.findByPk(id); // Return the updated student object
};

export const deleteStudent = async (
  id: number
): Promise<{ message: string }> => {
  const deletedCount = await db.Student.destroy({ where: { id } });
  if (deletedCount === 0) {
    return { message: `Student with ID ${id} not found` };
  }

  return { message: "Student deleted successfully" };
};
