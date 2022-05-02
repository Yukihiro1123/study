import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  //TextField,
  Typography,
  Paper,
  Slider,
} from "@mui/material";
//アイコン
import CheckIcon from "@mui/icons-material/Check";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import TimerIcon from "@mui/icons-material/Timer";
import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutline from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CancelIcon from "@mui/icons-material/Cancel";
//色
import {
  orange,
  lightBlue,
  // deepPurple,
  // deepOrange,
} from "@mui/material/colors";

import { useDispatch } from "react-redux";
import { createRecord } from "../../actions/records";

//タイマー
import { CountdownCircleTimer } from "react-countdown-circle-timer";
//音
import useSound from "use-sound";
import alarmSound from "./sounds/Clock-Alarm03-01(Loop).mp3";
import useStyles from "./styles.js";
const Task = ({ task, darkState }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const classes = useStyles();
  const dispatch = useDispatch();
  //Timer Dialog
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(10);
  const handleSliderChange = (event, newValue) => {
    setDuration(newValue);
  };
  //Timer sounds
  const [play] = useSound(alarmSound);
  //作業履歴の提出
  const handleSubmit = () => {
    var data = {
      name: task.title,
      project: task.project,
      color: task.color,
      duration: duration,
      creator: userId,
    };
    console.log(data);
    dispatch(
      createRecord({
        name: task.title,
        project: task.project,
        color: task.color,
        duration: duration,
        creator: userId,
      })
    );
    setOpen(false);
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const children = ({ remainingTime }) => {
    //桁数を2桁に指定
    const minutes = ("00" + Math.floor(remainingTime / 60)).slice(-2);
    const seconds = ("00" + (remainingTime % 60)).slice(-2);
    return (
      <div style={{ display: "flex", flexDirection: "row", color: "inherit" }}>
        <Typography variant="h1" color="primary">
          {minutes}
        </Typography>
        <Typography variant="h1" color="primary">
          :
        </Typography>
        <Typography variant="h1" color="primary">
          {seconds}
        </Typography>
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Box style={{ marginTop: "10px" }}>
        <Paper className={classes.paper} style={{ padding: "15px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* 優先度アイコン */}
            {task.completed ? (
              <CheckIcon style={{ color: "#009688" }} />
            ) : task.priority === 3 ? (
              <ArrowUpward style={{ color: "#f44336" }} />
            ) : task.priority === 2 ? (
              <ArrowUpward style={{ color: "#fb8c00" }} />
            ) : (
              <ArrowDownward style={{ color: "#2196f3" }} />
            )}
            <Typography variant="body2" style={{ marginLeft: "10px" }}>
              {task.title}
            </Typography>
          </div>
          <div>
            <IconButton
              color="primary"
              style={{
                padding: 0,
                marginHorizontal: "10px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <TimerIcon
                style={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </div>
          <Dialog
            open={open}
            onClose={(e) => {
              e.stopPropagation();
              setIsPlaying(false);
              setOpen(false);
            }}
            fullScreen
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <DialogTitle>{task.title}</DialogTitle>
              <div>
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                    setOpen(false);
                  }}
                >
                  <CancelIcon style={{ fontSize: "50px" }} />
                </IconButton>
              </div>
            </div>
            <DialogContent
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ margin: "10px" }}>
                <CountdownCircleTimer
                  isPlaying={isPlaying}
                  duration={duration * 60}
                  colors={darkState ? orange[500] : lightBlue[500]}
                  size={450}
                  onComplete={() => {
                    setIsPlaying(false);
                    play();
                    // 提出するデータ
                    handleSubmit();
                  }}
                >
                  {children}
                </CountdownCircleTimer>
              </div>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "150px",
                marginRight: "150px",
              }}
            >
              {/* タイマーのスタート、ストップ */}
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <PauseCircleOutline
                    style={{
                      fontSize: "100px",
                    }}
                  />
                ) : (
                  <PlayCircleOutline
                    style={{
                      fontSize: "100px",
                    }}
                  />
                )}
              </IconButton>
              {/* 時間設定バー */}
              {!isPlaying ? (
                <Box sx={{ width: 200 }}>
                  <Typography variant="h5">測定時間:{duration}分</Typography>
                  <Slider
                    value={duration}
                    valueLabelDisplay="auto"
                    min={5}
                    max={60}
                    onChange={handleSliderChange}
                    marks={[
                      {
                        value: 10,
                        label: "10分",
                      },
                      {
                        value: 30,
                        label: "30分",
                      },
                      {
                        value: 60,
                        label: "1時間",
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Box sx={{ width: 200 }}></Box>
              )}
              {/* Dialogを閉じる */}
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(false);
                  setOpen(false);
                }}
              >
                <StopCircleIcon
                  style={{
                    fontSize: "100px",
                  }}
                />
              </IconButton>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </div>
  );
};

export default Task;
