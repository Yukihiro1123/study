import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Button,
  Box,
  Divider,
  Drawer,
  FormGroup,
  FormControlLabel,
  CssBaseline,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Switch,
  ListItem,
  //ListItemAvatar,
  ListItemText,
  ListItemIcon,
  //Slide,
} from "@mui/material";
//logo
import todoLogo from "../../images/todo.png";
//icons
import BarChart from "@mui/icons-material/BarChart";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Notifications from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import NightlightIcon from "@mui/icons-material/Nightlight";
// import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
// import HelpIcon from "@mui/icons-material/Help";

import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";

const Navbar = ({ darkState, setDarkState }) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);
  console.log("CurrentUser", user);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user?.token]);

  //ログイン時アカウントメニュー
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //設定バー
  const [settingOpen, setSettingOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSettingOpen(!settingOpen);
  };
  //Switch
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  //light/dark
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        position="fixed"
        color="inherit"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* タイトル */}
        <Toolbar>
          <Link to="/" className={classes.brandContainer}>
            <img
              component={Link}
              to="/"
              src={todoLogo}
              alt="icon"
              height="45px"
            />
          </Link>
        </Toolbar>
        {/* 検索 */}
        {/*
        <TextField
          label="タスクを検索"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      　*/}
        {/* アカウント */}
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
                onClick={handleClick}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              {/* アカウント設定 */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{ width: "350px", padding: "10px" }}
              >
                <Typography
                  className={classes.username}
                  variant="h6"
                  sx={{ marginLeft: "10px" }}
                >
                  {user.result.name}
                </Typography>
                <MenuItem>
                  <Avatar
                    fontSize="small"
                    sx={{
                      color: darkState ? null : "black",
                      width: 30,
                      height: 30,
                    }}
                  />
                  Profile
                </MenuItem>
                <MenuItem>
                  <Avatar
                    fontSize="small"
                    sx={{
                      color: darkState ? null : "black",
                      width: 30,
                      height: 30,
                    }}
                  />
                  My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd
                      fontSize="small"
                      sx={{ color: darkState ? null : "black" }}
                    />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings
                      fontSize="small"
                      sx={{ color: darkState ? null : "black" }}
                    />
                  </ListItemIcon>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon
                      fontSize="small"
                      sx={{ color: darkState ? null : "black" }}
                    />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              component={Link}
              to="auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
          <Toolbar>
            {/* グラフ */}
            <IconButton component={Link} to="charts">
              <BarChart sx={{ color: darkState ? null : "black" }} />
            </IconButton>
            {/* 通知 */}
            <IconButton>
              <Notifications sx={{ color: darkState ? null : "black" }} />
            </IconButton>
            {/* 設定 */}
            <IconButton onClick={toggleDrawer}>
              <Settings sx={{ color: darkState ? null : "black" }} />
            </IconButton>
            <Drawer
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="right"
              open={settingOpen}
              onClose={toggleDrawer}
            >
              <div className={classes.toolbar} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography variant="h6">Settings</Typography>
                <IconButton onClick={toggleDrawer} size="large">
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider />
              <div style={{ padding: "10px" }}>
                <Typography>Mode: {darkState ? "dark" : "light"}</Typography>
                <div style={{ padding: "10px" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <MaterialUISwitch
                          sx={{ m: 1 }}
                          checked={darkState}
                          onChange={handleThemeChange}
                        />
                      }
                    />
                  </FormGroup>
                </div>
              </div>
              <Divider />
              <div style={{ padding: "10px" }}>
                <Typography>Language</Typography>
                <ListItem>
                  <ListItemText primary="日本語" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="English" />
                </ListItem>
              </div>
            </Drawer>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
