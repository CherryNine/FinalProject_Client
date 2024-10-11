import axios from "axios";

const repository = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

repository.interceptors.request.use((config) => {
  const access_token = sessionStorage.getItem("accessToken");

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

repository.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const access_token = sessionStorage.getItem("accessToken");
        
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        const response = await repository.get("auth/refresh", { headers });

        sessionStorage.setItem("accessToken", response.data.access_token);
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return repository(originalRequest);
      } catch (error) {
        console.error("Error refreshing access token", error);
        return Promise.reject("Unable to refresh access token");
      }
    }

    return Promise.reject(error);
  }
);

export default repository;
