import React, { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  //Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  //DialogContentText,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tabs,
  Tab,
  TextField,
  Typography,
  Paper,
  //Portal,
} from "@mui/material";
//import { createTheme, ThemeProvider } from "@mui/material/styles";

import useStyles from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
//アイコン
//import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
//CRUD
import { updateProject, deleteProject } from "../../actions/projects";
import { createTask } from "../../actions/tasks";

import { deleteTask } from "../../actions/tasks";
//アイコン

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//Component
import Task from "../Task/Task";
import AddProject from "./AddProject";
import TaskForm from "../Form/TaskForm";

function TabPanel(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const {
    value,
    index,
    text,
    tasks,
    project,
    setValue,
    num_projects,
    darkState,
  } = props;
  //それぞれのタスク
  const [currentId, setCurrentId] = useState(null);
  //ソート
  const [sortValue, setSortValue] = useState("期日");
  function sortFunc(sortValue) {
    if (sortValue === "期日") {
      return (a, b) => new Date(a.due) - new Date(b.due);
    } else if (sortValue === "優先度") {
      return (a, b) => b.priority - a.priority;
    }
  }
  //戻る
  const back = () => {
    setCurrentId("");
  };
  //新規タスク
  const [newData, setNewData] = useState({
    title: "",
    project: project ? project.title : "",
    color: project ? project.color : "",
  });

  const clear = () => {
    setNewData({ title: "", project: project ? project.title : "" });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(
        createTask({
          ...newData,
          creator: userId,
        })
      );
      clear();
    }
  };
  //既存プロジェクト
  const [prj, setPrj] = useState(project);
  //メニュー
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  //プロジェクトの削除、編集
  const [editOpen, setEditOpen] = useState(false);
  const handleEdit = () => {
    console.log(project);
    dispatch(updateProject(project?._id, { ...prj }));
    setEditOpen(false);
    handleMenuClose();
  };
  const handleDelete = (index) => {
    if (num_projects - 1 > 0) {
      console.log(prj);
      dispatch(deleteProject(project?._id));
      setValue(index - 1 || index + 1);
      tasks.forEach((task) => {
        dispatch(deleteTask(task._id));
      });
      handleMenuClose();
    } else {
      alert("YOU SHOULD HAVE AT LEAST 1 PROJECTS");
    }
  };
  //Dialog
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ minWidth: "100vw" }}
    >
      {value === index && (
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
            paddingLeft: 20,
            maxHeight: "800px",
            overflow: "auto",
          }}
        >
          <Grid item lg={8} md={12} xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* タイトル　*/}
              <Typography variant="h5" color="primary">
                {text}
              </Typography>
              {project ? (
                <div>
                  {/* メニューボタン　*/}
                  <IconButton onClick={handleMenuClick}>
                    <MoreHorizIcon />
                  </IconButton>
                  {/* プロジェクト編集、完了、削除*/}
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    //getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {/* 編集機能　クリックすると編集フォームを開く　*/}
                    <MenuItem
                      onClick={(e) => {
                        setEditOpen(true);
                      }}
                    >
                      編集
                    </MenuItem>
                    <Dialog
                      open={editOpen}
                      onClose={(e) => {
                        setEditOpen(false);
                      }}
                      style={{ maxWidth: "550px", margin: "auto" }}
                    >
                      <DialogTitle style={{ paddingBottom: "0px" }}>
                        Edit a Project
                      </DialogTitle>
                      <form>
                        <DialogContent style={{ padding: "24px 24px" }}>
                          <TextField
                            value={prj.title}
                            onChange={(e) => {
                              setPrj({ ...prj, title: e.target.value });
                              console.log(value);
                            }}
                            label="プロジェクト名"
                            required
                            size="small"
                            fullWidth
                          />
                          {/*
                          <FormControl
                            fullWidth
                            size="small"
                            sx={{ marginBottom: "16px" }}
                          >
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
                                    checked={color === prj.color}
                                    onChange={(e) => {
                                      setPrj({ ...prj, color: color });
                                    }}
                                  />
                                </ThemeProvider>
                              ))}
                            </div>
                          </FormControl>
                          */}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setEditOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEdit}>Save</Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                    <MenuItem onClick={handleAlertOpen}>削除</MenuItem>
                    {/* 警告Dialog */}
                    <Dialog open={alertOpen} onClose={handleAlertClose}>
                      <DialogTitle>Delete a Project</DialogTitle>
                      <form>
                        <DialogContent>
                          <Typography>プロジェクトを削除しますか？</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleAlertClose}>Cancel</Button>
                          <Button onClick={() => handleDelete(index)}>
                            Delete
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </Menu>
                </div>
              ) : null}
            </div>
            {/* タスク追加 */}
            <div>
              {project ? (
                <TextField
                  size="small"
                  label={`新しいタスクを"${project.title}"に追加 Enterキーで保存`} //
                  variant="outlined"
                  required
                  fullWidth
                  value={newData.title}
                  onChange={(e) => {
                    setNewData({
                      ...newData,
                      title: e.target.value,
                      project: project.title,
                    });
                  }}
                  onKeyDown={handleKeyPress}
                  style={{ marginTop: "10px" }}
                />
              ) : null}
              {/* ソート */}
              <Box
                sx={{
                  maxWidth: 120,
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginLeft: "auto",
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    label="Sort By"
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                  >
                    <MenuItem value={"期日"}>期日</MenuItem>
                    <MenuItem value={"優先度"}>優先度</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* タスク一覧画面　*/}
              <div
                style={{
                  maxHeight: "700px",
                  overflow: "auto",
                  paddingBottom: "10px",
                }}
              >
                {tasks.length > 0 ? (
                  tasks.sort(sortFunc(sortValue)).map((task) => (
                    <Grid
                      key={task._id}
                      item
                      onClick={() => setCurrentId(task._id)}
                    >
                      <Task task={task} darkState={darkState} />
                    </Grid>
                  ))
                ) : (
                  <div style={{ margin: "10px" }}>
                    <Typography>No Task to show.</Typography>
                  </div>
                )}
              </div>
            </div>
            {/*
            {project ? (
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography variant="caption">
                  Created by {project.creator}&nbsp;
                  {moment(project.createdAt).fromNow()}
                </Typography>
              </Box>
              ) : null}
            */}
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            {currentId ? (
              <Paper style={{ paddingHorizontal: "10px" }}>
                <TaskForm currentId={currentId} back={back} />
              </Paper>
            ) : (
              <Paper style={{ paddingHorizontal: "10px" }}></Paper>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const Projects = ({ darkState }) => {
  const classes = useStyles();
  //ユーザー
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  //console.log(user, userId);
  //activeTabsの代わり
  const { projects, isLoading } = useSelector((state) => state.projects);
  const personal_projects = projects.filter((p) => p.creator === userId);

  const num_projects = personal_projects.length;
  //activeTabの代わり
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //TabPanel用
  const { tasks } = useSelector((state) => state.tasks);
  const personal_tasks = tasks.filter((t) => t.creator === userId);
  const tasks_today = personal_tasks.filter(
    (task) =>
      moment(task.due).calendar().startsWith("Today") &&
      task.completed === false
  );
  const tasks_tomorrow = personal_tasks.filter(
    (task) =>
      moment(task.due).calendar().startsWith("Tomorrow") &&
      task.completed === false
  );
  const tasks_month = personal_tasks.filter(
    (task) =>
      moment(task.due).format("MMMM") === moment().format("MMMM") &&
      task.completed === false
  );
  const tasks_some = personal_tasks.filter(
    (task) => task.due === null && task.completed === false
  );
  const tasks_completed = personal_tasks.filter(
    (task) => task.completed === true
  );

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100vw",
        position: "fixed",
        top: "66px",
        bottom: "36.5px",
        left: "0",
        right: "0",
      }}
      className={classes.sidebar}
    >
      <Divider style={{ position: "fixed", top: "200px" }} />
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          width: "140px",
          height: "100%",
          position: "fixed",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        {/* indexをTabに渡す */}
        {["今日", "明日", "今月中", "いつか", "完了済み"].map((text, index) => (
          <Tab
            label={text}
            {...a11yProps(index)}
            key={index}
            sx={{
              borderBottom: text === "完了済み" ? 1 : null,
              borderColor: text === "完了済み" ? "divider" : null,
            }}
          />
        ))}
        {personal_projects.map((project, index) => (
          <Tab label={project.title} {...a11yProps(index)} key={project._id} />
        ))}
      </Tabs>
      <AddProject numProjects={personal_projects.length} />
      {/* タブをクリックすると開かれるタスク一覧　*/}
      <TabPanel
        value={value}
        index={0}
        text={"今日"}
        tasks={tasks_today}
        num_projects={num_projects}
        project=""
        darkState={darkState}
      />
      <TabPanel
        value={value}
        index={1}
        text={"明日"}
        tasks={tasks_tomorrow}
        num_projects={num_projects}
        project=""
        darkState={darkState}
      />
      <TabPanel
        value={value}
        index={2}
        text={"今月"}
        tasks={tasks_month}
        num_projects={num_projects}
        project=""
        darkState={darkState}
      />
      <TabPanel
        value={value}
        index={3}
        text={"いつか"}
        tasks={tasks_some}
        num_projects={num_projects}
        project=""
        darkState={darkState}
      />
      <TabPanel
        value={value}
        index={4}
        text={"完了済み"}
        tasks={tasks_completed}
        num_projects={num_projects}
        project=""
        darkState={darkState}
      />
      {personal_projects.map((project, index) => (
        <TabPanel
          value={value}
          index={index + 5}
          text={project.title}
          tasks={personal_tasks.filter(
            (task) => task.project === project.title && task.completed === false
          )}
          project={project}
          num_projects={num_projects}
          setValue={setValue}
          darkState={darkState}
          key={project._id}
        />
      ))}
    </Box>
  );
};

export default Projects;
