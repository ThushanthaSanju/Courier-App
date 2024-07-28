import axiosInstance from "./axiosInstance";

export const trackShipment = async (shipmentId: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.data.token;

  try {
    const response = await axiosInstance.get(
      `/shipments/shipment/track/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error tracking shipment with ID ${shipmentId}:`, error);
    throw error;
  }
};
