import db from "../../database/connect";
import { EnrollmentInput, EnrollmentOutput } from "../../models/Enrollment";

export const getAllEnrollments = async (
  page: number,
  limit: number
): Promise<{
  data: EnrollmentOutput[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> => {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Find all enrollments with pagination (consider including filters/sorting)
  const { rows: enrollments, count: totalCount } =
    await db.Enrollment.findAndCountAll({
      limit,
      offset,
    });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: enrollments,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createEnrollment = async (
  data: EnrollmentInput
): Promise<EnrollmentOutput | { message: string }> => {
  const existingEnrollment = await db.Enrollment.findOne({
    where: { studentId: data.studentId, classId: data.classId },
  }); // Check for duplicate enrollment (optional)
  if (existingEnrollment) {
    return {
      message: `Student with ID ${data.studentId} is already enrolled in Class ID ${data.classId}`,
    };
  }

  const newEnrollment = await db.Enrollment.create(data);
  return newEnrollment;
};

export const updateEnrollment = async (
  id: number,
  data: Partial<EnrollmentInput>
): Promise<EnrollmentOutput | { message: string }> => {
  const enrollmentToUpdate = await db.Enrollment.findByPk(id);
  if (!enrollmentToUpdate) {
    return { message: `Enrollment with ID ${id} not found` };
  }

  await enrollmentToUpdate.update(data);
  return await db.Enrollment.findByPk(id); // Return the updated enrollment object
};

export const deleteEnrollment = async (
  id: number
): Promise<{ message: string }> => {
  const deletedCount = await db.Enrollment.destroy({ where: { id } });
  if (deletedCount === 0) {
    return { message: `Enrollment with ID ${id} not found` };
  }

  return { message: "Enrollment deleted successfully" };
};
