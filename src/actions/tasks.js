import * as api from "../api";
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_ALL_TASKS,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTasks();
    dispatch({ type: FETCH_ALL_TASKS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createTask(task);
    dispatch({ type: CREATE_TASK, payload: data });
    console.log(data);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateTask(id, task);
    dispatch({ type: UPDATE_TASK, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteTask(id);
    dispatch({ type: DELETE_TASK, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
