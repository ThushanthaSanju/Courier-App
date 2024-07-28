import axiosInstance from "./axiosInstance";

export const getUserShipments = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.data.token;

  try {
    const response = await axiosInstance.get("/shipments/user/shipment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shipments:", error);
    throw error;
  }
};
