import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useStyles from "./styles";
import { updateTask, deleteTask } from "../../actions/tasks";

const TaskForm = ({ currentId, back }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    project: "",
    //tags: "",
    desc: "",
    priority: "",
    due: "",
    completed: "",
  });

  const projects = useSelector((state) => state.projects.projects);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const parent_projects = projects.filter((p) => p.creator === userId);
  console.log(parent_projects);
  const parent_project = projects.find((p) => p.title === data.project);
  const projectId = parent_project?._id;
  //console.log(projectId);
  const task = useSelector((state) =>
    currentId ? state.tasks.tasks.find((t) => t._id === currentId) : null
  );
  useEffect(() => {
    if (task) setData(task);
  }, [task]);

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(data);
    //提出するデータと同じプロジェクトデータを抽出、Idを該当するプロジェクトのものに変更
    dispatch(updateTask(currentId, { ...data, projectId: projectId }));
    back();
  };
  const handleDelete = () => {
    dispatch(deleteTask(currentId));
    back();
  };
  //Dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={classes.card}>
      <form onSubmit={handleEdit} className={classes.form}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={back}>
                <CloseIcon />
              </IconButton>
            </div>
            <TextField
              label="タスク名"
              required
              fullWidth
              value={data.title}
              size="small"
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              sx={{ marginBottom: "16px" }}
            />
            <FormControl fullWidth size="small" sx={{ marginBottom: "16px" }}>
              <InputLabel>プロジェクト</InputLabel>
              <Select
                value={data.project}
                label="プロジェクト"
                onChange={(e) => {
                  setData({ ...data, project: e.target.value });
                }}
              >
                {parent_projects.map((project) => (
                  <MenuItem key={project._id} value={project.title}>
                    {project.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/*<TextField
              label="タグ"
              required
              fullWidth
              value={data.tags}
              size="small"
              onChange={(e) => {
                setData({ ...data, tags: e.target.value });
              }}
              sx={{ marginBottom: "16px" }}
            />*/}
            <TextField
              size="small"
              label="概要"
              required
              fullWidth
              multiline
              minRows={3}
              maxRows={10}
              value={data.desc}
              onChange={(e) => {
                setData({ ...data, desc: e.target.value });
              }}
              sx={{ marginBottom: "16px" }}
            />
            <FormControl fullWidth size="small" min="true">
              <InputLabel>優先度</InputLabel>
              <Select
                value={data.priority}
                label="優先度"
                onChange={(e) => {
                  setData({ ...data, priority: e.target.value });
                }}
                sx={{ marginBottom: "16px" }}
              >
                <MenuItem value={1}>
                  <div
                    style={{
                      display: "flex",
                      alignItem: "center",
                    }}
                  >
                    <ArrowDownward
                      style={{ color: "#009688", marginRight: "2px" }}
                    />
                    優先度・低
                  </div>
                </MenuItem>
                <MenuItem value={2}>
                  <div
                    style={{
                      display: "flex",
                      alignItem: "center",
                    }}
                  >
                    <ArrowUpward
                      style={{ color: "#fb8c00", marginRight: "2px" }}
                    />
                    優先度・中
                  </div>
                </MenuItem>
                <MenuItem value={3}>
                  <div
                    style={{
                      display: "flex",
                      alignItem: "center",
                    }}
                  >
                    <ArrowUpward
                      style={{ color: "#f44336", marginRight: "2px" }}
                    />
                    優先度・高
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  renderInput={(props) => <TextField {...props} size="small" />}
                  label="DateTimePicker"
                  value={data.due}
                  onChange={(newValue) => {
                    setData({ ...data, due: newValue });
                  }}
                />
              </LocalizationProvider>
              <FormControl component="fieldset" variant="standard">
                <FormHelperText>タスクの状態</FormHelperText>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>作業中</Typography>
                  <Switch
                    checked={data.completed === true}
                    onChange={(e) => {
                      setData({ ...data, completed: !data.completed });
                    }}
                  />
                  <Typography>完了</Typography>
                </div>
              </FormControl>
            </div>
          </CardContent>
          <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
            {/*<Typography>Created by {task.creator}</Typography>*/}
            <IconButton aria-label="delete" onClick={handleOpen}>
              <DeleteIcon />
            </IconButton>
            {/* 警告Dialog */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Delete a Task</DialogTitle>
              <form>
                <DialogContent>
                  <Typography>タスクを削除しますか？</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
              </form>
            </Dialog>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default TaskForm;
