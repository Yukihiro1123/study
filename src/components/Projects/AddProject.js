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

const AddProject = ({ projects }) => {
  //const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const colors = [
    "#0000cd",
    "#0000ff",
    "#008b8b",
    "#00bfff",
    "#00fa9a",
    "#00ff00",
    "#00ffff",
    "#228b22",
    "#2e8b57",
    "#2f4f4f",
    "#32cd32",
    "#4682b4",
    "#483d8b",
    "#499894",
    "#4E79A7",
    "#4b0082",
    "#556b2f",
    "#59A14F",
    "#6495ed",
    "#708090",
    "#79706E",
    "#7b68ee",
    "#7fffd4",
    "#800000",
    "#808000",
    "#86BCB6",
    "#87ceeb",
    "#8CD17D",
    "#8b008b",
    "#8b4513",
    "#8fbc8f",
    "#90ee90",
    "#9932cc",
    "#9D7660",
    "#9acd32",
    "#A0CBE8",
    "#B07AA1",
    "#B6992D",
    "#BAB0AC",
    "#D37295",
    "#D4A6C8",
    "#D7B5A6",
    "#E15759",
    "#F1CE63",
    "#F28E2B",
    "#FABFD2",
    "#FF9D9A",
    "#FFBE7D",
    "#a020f0",
    "#adff2f",
    "#b03060",
    "#d2691e",
    "#da70d6",
    "#daa520",
    "#dc143c",
    "#dda0dd",
    "#f08080",
    "#f0e68c",
    "#f4a460",
    "#ff00ff",
    "#ff1493",
    "#ff4500",
    "#ff6347",
    "#ff69b4",
    "#ff8c00",
    "#ffb6c1",
    "#ffd700",
    "#ffe4b5",
    "#ffff54",
  ];
  //タスクのタイトル
  const titles = projects.map((p) => p.title);

  const [newData, setNewData] = useState({
    title: "",
    color: colors[Math.floor(Math.random() * colors.length)],
  });

  const dispatch = useDispatch();
  //プロジェクト新規作成
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
    //ログインしていない場合、プロジェクト名が既に存在する場合に警告
    if (!user) {
      alert("PLEASE LOG IN TO CREATE PROJECTS");
    } else if (titles.includes(newData.title)) {
      alert("Project already exists.");
    } else {
      if (projects.length < 10) {
        e.preventDefault();
        dispatch(
          createProject({
            ...newData,
            creator: userId,
          })
        );
        clear();
        setOpen(false);
      } else {
        alert("Too many Projects!");
      }
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
