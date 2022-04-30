import React, { useEffect } from "react";
import {
  // Box,
  // Container,
  // Toolbar,
  // Typography,
  // Grow,
  // Grid,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getProjects } from "../../actions/projects";
import { getTasks } from "../../actions/tasks";
import { getRecords } from "../../actions/records";

import Projects from "../Projects/Projects";

import useStyles from "./styles";
const Home = ({ darkState }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  return (
    <Paper className={classes.project}>
      <Projects darkState={darkState} />
    </Paper>
  );
};

export default Home;
