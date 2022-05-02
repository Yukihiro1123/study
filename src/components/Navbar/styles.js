import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: "1250 !important",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    // },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  drawer: {
    margin: "10px",
    minWidth: "300px",
    zIndex: "2000 !important",
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      minWidth: "300px !important",
      boxSizing: "border-box",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    //width: "400px",
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
    width: "40px",
    height: "40px",
  },
  menu: {
    [`& .MuiPaper-elevation8`]: {
      boxShadow:
        "0px 1px 1px -1px rgb(0 0 0 / 20%), 0px  1px 1px rgb(0 0 0 / 14%), 0px 1px 5px 1px rgb(0 0 0 / 12%)",
    },
  },
  profile: {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  settings: {
    [`& .MuiDrawer-paper`]: {
      width: "350px",
    },
  },
}));
