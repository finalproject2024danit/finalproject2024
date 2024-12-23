import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://134.209.246.21:9000/api/v1",
  // baseURL: 'http://localhost:9000/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);   
  }
);

export const loginByEmail = async (loginPayload) => {
  try {
    const response = await axios.post(
      "http://134.209.246.21:9000/auth/login",
      loginPayload
    );
    const { accessToken } = response.data;
    localStorage.setItem("authToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

export default axiosInstance;
