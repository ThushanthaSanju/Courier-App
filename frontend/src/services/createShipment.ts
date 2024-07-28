import axiosInstance from "./axiosInstance";

export const createShipment = async (shipmentData: object) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.data.token;

  try {
    const response = await axiosInstance.post(
      `/shipments/shipment`,
      shipmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating shipment:", error);
    throw error;
  }
};
