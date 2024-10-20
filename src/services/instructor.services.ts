import db from "../database/connect";

export const getAllTeachert = async (page: number, limit: number) => {
  // Calculamos el offset para la paginación
  const offset = (page - 1) * limit;

  // Realizamos la consulta a la base de datos
  const findAllTeacher = await db.Teacher.findAll({
    limit: limit,
    offset: offset,
  });

  // También puedes obtener el total de registros para calcular el número total de páginas
  const totalCount = await db.Teacher.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: findAllTeacher,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createTeacher = async (name: string, email:string, hireDate: Date) => {
  const findTeacher = await db.Teacher.findOne({
    where: { name },
  });

  if (findTeacher) {
    return {
      message: "Teacher already exists",
    };
  }

  const newTeacher = await db.Teacher.create({
    name,
    email,
    hireDate
  });
  return newTeacher;
};

export const updateTeacher = async (id: number, name: string, email:string, hireDate: Date) => {
  const findTeacher = await db.Teacher.findOne({
    where: { id },
  });

  if (!findTeacher) return { message: "Teacher dont exists" };

  if (name) findTeacher.name = name;
  if (email) findTeacher.email = email;
  if (hireDate) findTeacher.hireDate = hireDate;


  const updateTeacher = await findTeacher.save();

  return updateTeacher;
};

export const deleteTeacher = async (id: number) => {
  const deleteTeacher = await db.Teacher.destroy({
    where: { id },
  });
  if (deleteTeacher !== 1) return { message: "Teacher already exists" };

  return { message: "Teacher was delete correctly" };
};
