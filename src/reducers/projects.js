import {
  FETCH_ALL_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const projects = (state = { isLoading: true, projects: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_PROJECTS:
      return { ...state, projects: action.payload };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case CREATE_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    default:
      return state;
  }
};

export default projects;
