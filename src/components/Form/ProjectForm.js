import React from "react";
import {
  //Box,
  Button,
  // Card,
  // CardActions,
  // CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  //DialogContentText,
  DialogActions,
  TextField,
  Typography,
  //Modal,
} from "@mui/material";

const ProjectForm = ({
  edit,
  data,
  setData,
  open,
  setOpen,
  handleOpen,
  handleClose,
  handleSubmit,
}) => {
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        <Typography>{edit ? "EDIT" : "+ CREATE NEW"} PROJECT</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{edit ? "Edit" : "Create"} a Project</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              value={data?.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              label="プロジェクト名"
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>{edit ? "Edit" : "Create"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProjectForm;
