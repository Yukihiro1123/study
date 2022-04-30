import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  FETCH_ALL_PROJECTS,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
//api/index.jsから各関数を取得
import * as api from "../api";

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProjects();
    dispatch({ type: FETCH_ALL_PROJECTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createProject(project);
    dispatch({ type: CREATE_PROJECT, payload: data });
    console.log(data);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateProject(id, project);
    dispatch({ type: UPDATE_PROJECT, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteProject(id);
    dispatch({ type: DELETE_PROJECT, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
