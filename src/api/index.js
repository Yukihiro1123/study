import axios from "axios";

const API = axios.create({
  baseURL: "https://study-mern-yukihiro.herokuapp.com/", // // https://study-mern-yukihiro.herokuapp.com/
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchProjects = () => API.get("/projects");
export const createProject = (newProject) => API.post("/projects", newProject);
export const updateProject = (id, updatedProject) =>
  API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchTasks = () => API.get("/tasks");
export const createTask = (newTask) => API.post("/tasks", newTask);
export const updateTask = (id, updatedTask) =>
  API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const fetchRecords = () => API.get("/records");
export const createRecord = (newRecord) => API.post("/records", newRecord);
// export const updateRecord = (id, updatedRecord) =>
//   API.patch(`/records/${id}`, updatedRecord);
// export const deleteRecord = (id) => API.delete(`/records/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
