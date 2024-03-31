import axiosClient from "./axiosClient";

export const studentServices = {
  getAll: (params) => {
    return axiosClient.get("/students", { params });
  },
  get: (id) => {
    return axiosClient.get(`/students/${id}`);
  },
  update: (id, data) => {
    return axiosClient.patch(
      `/students/${id}`,
      { ...data }
    );
  },
  create: (data) => {
    return axiosClient.post(
      "/students",
      { ...data }
    );
  },
  delete: (id) => {
    return axiosClient.delete(`/students/${id}`);
  },
};
