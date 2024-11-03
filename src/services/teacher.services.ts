import db from "../database/connect";
import { TeacherOutput, TeacherInput } from "../models/Teacher";

export const getAllTeachers = async (
    page: number,
    limit: number
  ): Promise<{ data: TeacherOutput[], totalCount: number, currentPage: number, totalPages: number }> => {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
  
    // Find all teachers with pagination (consider including filters/sorting)
    const { rows: teachers, count: totalCount } = await db.Teacher.findAndCountAll({
      limit,
      offset,
    });
  
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
  
    return {
      data: teachers,
      totalCount,
      currentPage: page,
      totalPages,
    };
  };
  
  export const createTeacher = async (data: TeacherInput): Promise<TeacherOutput | { message: string }> => {
    // Consider adding validation for unique constraints (e.g., email, phone number)
  
    const newTeacher = await db.Teacher.create(data);
    return newTeacher;
  };
  
  export const updateTeacher = async (id: number, data: Partial<TeacherInput>): Promise<TeacherOutput | { message: string }> => {
    const teacherToUpdate = await db.Teacher.findByPk(id);
    if (!teacherToUpdate) {
      return { message: `Teacher with ID ${id} not found` };
    }
  
    await teacherToUpdate.update(data);
    return await db.Teacher.findByPk(id); // Return the updated teacher object
  };
  
  export const deleteTeacher = async (id: number): Promise<{ message: string }> => {
    const deletedCount = await db.Teacher.destroy({ where: { id } });
    if (deletedCount === 0) {
      return { message: `Teacher with ID ${id} not found` };
    }
  
    return { message: "Teacher deleted successfully" };
  };