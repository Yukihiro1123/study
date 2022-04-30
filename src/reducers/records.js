import {
  FETCH_ALL_RECORDS,
  CREATE_RECORD,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { isLoading: true, records: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_RECORDS:
      return { ...state, records: action.payload };
    case CREATE_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    default:
      return state;
  }
};
