import axiosInstance from "./axiosInstance";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
}

export const createAccount = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
