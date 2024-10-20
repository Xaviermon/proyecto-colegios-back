import db from "../database/connect";

export const getAllStudent = async (page: number, limit: number) => {
  // Calculamos el offset para la paginación
  const offset = (page - 1) * limit;

  // Realizamos la consulta a la base de datos
  const findAllStudent = await db.Student.findAll({
    limit: limit,
    offset: offset,
  });

  // También puedes obtener el total de registros para calcular el número total de páginas
  const totalCount = await db.Student.count();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: findAllStudent,
    totalCount,
    currentPage: page,
    totalPages,
  };
};

export const createStudent = async (name: string, email:string, grade: string, enrollmentData: Date) => {
  const findStudent = await db.Student.findOne({
    where: { name },
  });

  if (findStudent) {
    return {
      message: "Student already exists",
    };
  }

  const newStudent = await db.Student.create({
    name,
    email,
    grade,
    enrollmentData
  });
  return newStudent;
};

export const updateStudent = async (id: number, name: string, email:string, grade: string, enrollmentData: Date) => {
  const findStudent = await db.Student.findOne({
    where: { id },
  });

  if (!findStudent) return { message: "Student dont exists" };

  if (name) findStudent.name = name;
  if (email) findStudent.email = email;
  if (grade) findStudent.grade = grade;
  if (enrollmentData) findStudent.enrollmentData = enrollmentData;


  const updateStudent = await findStudent.save();

  return updateStudent;
};

export const deleteStudent = async (id: number) => {
  const deleteStudent = await db.Student.destroy({
    where: { id },
  });
  if (deleteStudent !== 1) return { message: "Student already exists" };

  return { message: "Student was delete correctly" };
};
