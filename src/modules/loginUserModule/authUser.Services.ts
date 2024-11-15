import db from "../../database/connect";
import { verified } from "../../utils/password";
import { generateToken } from "../../utils/jwt.utils";

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Check if user exists
    const userStudent = await db.Student.findOne({ where: { email } });
    const userTeacher = await db.Teacher.findOne({ where: { email } });

    if (!userStudent && !userTeacher) {
      throw new Error("Invalid email or password");
    }

    let user: User | null = userStudent;

    if (!user) {
      user = userTeacher;
    }

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isVerified = await verified(password, user.password);
    if (!isVerified) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error; // Re-throw the error after logging it
  }
};
