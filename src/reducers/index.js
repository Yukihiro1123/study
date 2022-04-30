import { combineReducers } from "redux";

import projects from "./projects";
import tasks from "./tasks";
import records from "./records";
import auth from "./auth";

export const reducers = combineReducers({
  projects,
  tasks,
  records,
  auth,
});
