import {
  CREATE_RECORD,
  FETCH_ALL_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
//api/index.jsから各関数を取得
import * as api from "../api";

export const getRecords = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecords();
    dispatch({ type: FETCH_ALL_RECORDS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = (record) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRecord(record);
    dispatch({ type: CREATE_RECORD, payload: data });
    console.log(data);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// export const updateRecord = (id, record) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data } = await api.updateRecord(id, record);
//     dispatch({ type: UPDATE_RECORD, payload: data });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteRecord = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     await api.deleteRecord(id);
//     dispatch({ type: DELETE_RECORD, payload: id });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };
