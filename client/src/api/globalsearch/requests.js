import axiosInstance from "../axiosInstance.js";

export const searchGlobal = async (keyword) => {
  try {
    const response = await axiosInstance.get("/search", {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};
