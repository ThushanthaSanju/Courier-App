import axiosInstance from "./axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
