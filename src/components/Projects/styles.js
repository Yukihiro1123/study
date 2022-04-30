import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  sidebar: {
    [`& .MuiTabs-scrollable`]: {
      minWidth: "160px",
      borderRight: "1px inset",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 10px 0 10px",
    borderRadius: 0,
  },
  drawer: {
    marginTop: "10px",
    width: "30% !important",
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: "30% !important",
      boxSizing: "border-box",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  menu: {
    [`& .MuiPaper-elevation8`]: {
      boxShadow:
        "0px 1px 1px -1px rgb(0 0 0 / 20%), 0px  1px 1px rgb(0 0 0 / 14%), 0px 1px 5px 1px rgb(0 0 0 / 12%)",
    },
  },
}));
