import axiosInstance from "./axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem(
      "userName",
      JSON.stringify(response.data.data.user.name)
    );

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
