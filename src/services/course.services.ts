import db from "../database/connect";

export const getAllCourse = async (page: number, limit: number) => {
  // Calculamos el offset para la paginación
  const offset = (page - 1) * limit;

  // Realizamos la consulta a la base de datos
  const findAllCourse = await db.Course.findAll({
    limit: limit,
    offset: offset,
  });

  // También puedes obtener el total de registros para calcular el número total de páginas
  const totalCount = await db.Course.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: findAllCourse,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createCourse = async (name: string, code: string, description:string) => {
  const findCourse = await db.Course.findOne({
    where: { name },
  });

  if (findCourse) {
    return {
      message: "Course already exists",
    };
  }

  const newCourse = await db.Course.create({
    name,
    code,
    description
  });
  return newCourse;
};

export const updateCourse = async (
  id: number,
  name: string,
  code: string,
  description:string
) => {
  const findCourse = await db.Course.findOne({
    where: { id },
  });

  if (!findCourse) return { message: "Course dont exists" };

  if (name) findCourse.name = name;
  if (code) findCourse.code = code;
  if (description) findCourse.description = description;

  const updateCourse = await findCourse.save();

  return updateCourse;
};

export const deleteCourse = async (id: number) => {
  const deleteCourse = await db.Course.destroy({
    where: { id },
  });
  if (deleteCourse !== 1) return { message: "Course already exists" };

  return { message: "Course was delete correctly" };
};
