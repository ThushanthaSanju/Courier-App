import axiosInstance from "./axiosInstance";

export const updateShipment = async (
  shipmentId: number,
  shipmentData: object
) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.data.token;

  try {
    const response = await axiosInstance.put(
      `/shipments/shipment/${shipmentId}`,
      shipmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating shipment with ID ${shipmentId}:`, error);
    throw error;
  }
};
