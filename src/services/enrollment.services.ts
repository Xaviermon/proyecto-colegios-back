import db from "../database/connect";

export const getAllEnrollment = async (page: number, limit: number) => {
  // Calculamos el offset para la paginación
  const offset = (page - 1) * limit;

  // Realizamos la consulta a la base de datos
  const findAllEnrollment = await db.Enrollment.findAll({
    limit: limit,
    offset: offset,
  });

  // También puedes obtener el total de registros para calcular el número total de páginas
  const totalCount = await db.Enrollment.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: findAllEnrollment,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createEnrollment = async (enrollmentDate: Date) => {
  const findEnrollment = await db.Enrollment.findOne({
    where: { enrollmentDate },
  });

  if (findEnrollment) {
    return {
      message: "newEnrollment already exists",
    };
  }

  const newEnrollment = await db.Enrollment.create({
    enrollmentDate
  });
  return newEnrollment;
};

export const updateEnrollment = async (
  id: number,
  enrollmentDate: Date
) => {
  const findEnrollment = await db.Enrollment.findOne({
    where: { id },
  });

  if (!findEnrollment) return { message: "Enrollment dont exists" };

  if (enrollmentDate) findEnrollment.enrollmentDate = enrollmentDate;


  const updateEnrollment = await findEnrollment.save();

  return updateEnrollment;
};

export const deleteEnrollment = async (id: number) => {
  const deleteEnrollmente = await db.Enrollment.destroy({
    where: { id },
  });
  if (deleteEnrollmente !== 1) return { message: "Enrollment already exists" };

  return { message: "Enrollment was delete correctly" };
};
