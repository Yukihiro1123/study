import React, { useState } from "react";
import {
  Button,
  //Box,
  //Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  //FormControl,
  //IconButton,
  TextField,
  //Typography,
} from "@mui/material";
//import { createTheme, ThemeProvider } from "@mui/material/styles";
//アイコン
import {
  createProject,
  // updateProject,
  // deleteProject,
} from "../../actions/projects";
import AddIcon from "@mui/icons-material/Add";
//import useStyles from "./styles";
import { useDispatch } from "react-redux";

const AddProject = ({ numProjects }) => {
  //const classes = useStyles();
  const colors = [
    "#4E79A7",
    "#A0CBE8",
    "#F28E2B",
    "#FFBE7D",
    "#59A14F",
    "#8CD17D",
    "#B6992D",
    "#F1CE63",
    "#499894",
    "#86BCB6",
    "#E15759",
    "#FF9D9A",
    "#79706E",
    "#BAB0AC",
    "#D37295",
    "#FABFD2",
    "#B07AA1",
    "#D4A6C8",
    "#9D7660",
    "#D7B5A6",
  ];

  const [newData, setNewData] = useState({
    title: "",
    color: colors[numProjects],
  });

  const dispatch = useDispatch();
  //タスク新規作成
  const [open, setOpen] = useState(false);
  const clear = () => {
    setNewData({ title: "" });
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleSubmit = (e) => {
    if (numProjects < 10) {
      e.preventDefault();
      console.log(newData);
      dispatch(createProject(newData));
      clear();
      setOpen(false);
    } else {
      alert("Too many Projects!");
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        width: "140px",
        bottom: "0",
      }}
    >
      <Divider />
      <Button
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
        style={{
          minWidth: "140px",
          border: "1",
        }}
      >
        CREATE
      </Button>
      {/* プロジェクト新規作成フォーム */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        style={{ maxWidth: "550px", margin: "auto" }}
      >
        <DialogTitle>Create a Project</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              value={newData.title}
              onChange={(e) => {
                setNewData({ ...newData, title: e.target.value });
              }}
              label="プロジェクト名"
              required
              fullWidth
              onKeyDown={handleKeyPress}
            />
            {/*
            <FormControl fullWidth size="small" sx={{ marginBottom: "16px" }}>
              <div>
                {[
                  "#4E79A7",
                  "#A0CBE8",
                  "#F28E2B",
                  "#FFBE7D",
                  "#59A14F",
                  "#8CD17D",
                  "#B6992D",
                  "#F1CE63",
                  "#499894",
                  "#86BCB6",
                  "#E15759",
                  "#FF9D9A",
                  "#79706E",
                  "#BAB0AC",
                  "#D37295",
                  "#FABFD2",
                  "#B07AA1",
                  "#D4A6C8",
                  "#9D7660",
                  "#D7B5A6",
                ].map((color, index) => (
                  <ThemeProvider
                    theme={createTheme({
                      palette: {
                        primary: {
                          main: color,
                        },
                      },
                    })}
                    key={color}
                  >
                    <Checkbox
                      style={{
                        color: color,
                      }}
                      checked={index === numProjects}
                      onChange={(e) => {
                        setNewData({ ...newData, color: color });
                      }}
                    />
                  </ThemeProvider>
                ))}
              </div>
              </FormControl>
                  */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddProject;
