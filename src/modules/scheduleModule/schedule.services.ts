import db from "../../database/connect";
import { ScheduleOutput, ScheduleInput } from "../../models/Schedule";

export const getAllSchedules = async (
  page: number,
  limit: number
): Promise<{
  data: ScheduleOutput[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> => {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Find all schedules with pagination (consider including filters/sorting)
  const { rows: schedules, count: totalCount } =
    await db.Schedule.findAndCountAll({
      limit,
      offset,
    });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: schedules,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createSchedule = async (
  data: ScheduleInput
): Promise<ScheduleOutput | { message: string }> => {
  // Consider adding validation to ensure startTime is before endTime

  const newSchedule = await db.Schedule.create(data);
  return newSchedule;
};

export const updateSchedule = async (
  id: number,
  data: Partial<ScheduleInput>
): Promise<ScheduleOutput | { message: string }> => {
  const scheduleToUpdate = await db.Schedule.findByPk(id);
  if (!scheduleToUpdate) {
    return { message: `Schedule with ID ${id} not found` };
  }

  await scheduleToUpdate.update(data);
  return await db.Schedule.findByPk(id); // Return the updated schedule object
};

export const deleteSchedule = async (
  id: number
): Promise<{ message: string }> => {
  const deletedCount = await db.Schedule.destroy({ where: { id } });
  if (deletedCount === 0) {
    return { message: `Schedule with ID ${id} not found` };
  }

  return { message: "Schedule deleted successfully" };
};
