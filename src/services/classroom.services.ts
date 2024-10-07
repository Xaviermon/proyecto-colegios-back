import db from "../database/connect";

export const getAllClassRoom = async (page: number, limit: number) => {
  // Calculamos el offset para la paginación
  const offset = (page - 1) * limit;

  // Realizamos la consulta a la base de datos
  const findAllClassRoom = await db.ClassRoom.findAll({
    limit: limit,
    offset: offset,
  });

  // También puedes obtener el total de registros para calcular el número total de páginas
  const totalCount = await db.ClassRoom.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: findAllClassRoom,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createClassRoom = async (name: string, capacity: number) => {
  const findClassRoom = await db.ClassRoom.findOne({
    where: { name },
  });

  if (findClassRoom) {
    return {
      message: "ClassRoom already exists",
    };
  }

  const newClassRoom = await db.ClassRoom.create({
    name,
    capacity,
  });
  return newClassRoom;
};

export const updateClassRoom = async (
  id: number,
  name: string,
  capacity: string
) => {
  const findClassRoom = await db.ClassRoom.findOne({
    where: { id },
  });

  if (!findClassRoom) return { message: "ClassRoom dont exists" };

  if (name) findClassRoom.name = name;
  if (capacity) findClassRoom.capacity = capacity;

  const updateClassRoom = await findClassRoom.save();

  return updateClassRoom;
};

export const deleteClassRoom = async (id: number) => {
  const deleteClassRoom = await db.ClassRoom.destroy({
    where: { id },
  });
  if (deleteClassRoom !== 1) return { message: "ClassRoom already exists" };

  return { message: "ClassRoom was delete correctly" };
};
