import axiosInstance from "./axiosInstance";

export const deleteShipment = async (shipmentId: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.data.token;

  try {
    const response = await axiosInstance.delete(
      `/shipments/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting shipment with ID ${shipmentId}:`, error);
    throw error;
  }
};
