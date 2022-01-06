import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import validator from "validator";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@material-ui/core";

const axios = require("axios");
const crypto = require("crypto");

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

const useStyles = makeStyles({
  input: {
    color: "white",
  },
});

const helperTextStyles = makeStyles(() => ({
  root: {
    margin: "0px",
    color: "#ACD7AB",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      paddingBottom: "0px",
      backgroundColor: "#ACD7AB",
      color: "red",
    },
  },
}));

const ProfilePage = () => {
  const [alignment, setAlignment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openChangePw, setOpenChangePw] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [subscription, setSubscription] = React.useState("Premium");

  const classes = useStyles();

  const helperTestClasses = helperTextStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let [password, setPassword] = useState("");
  const [unhashedPassword, setUnhashedPassword] = useState("");
  const password_hash = crypto.createHash("md5").update(password).digest("hex");

  let [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstNameValid, setFirstNameIsValid] = useState(true);
  const [fnDirty, setFnDirty] = useState(false);
  const [isLastNameValid, setLastNameIsValid] = useState(true);
  const [lnDirty, setLnDirty] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(true);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isConfirmValid, setConfirmIsValid] = useState(true);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [isBirthdayValid, setBirthdayIsValid] = useState(true);
  const [birthdayDirty, setBirthdayDirty] = useState(false);
  const [isGenderValid, setGenderIsValid] = useState(true);
  const [genderDirty, setGenderDirty] = useState(false);
  let allValid =
    isLastNameValid && isFirstNameValid && isBirthdayValid && isGenderValid;

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const isValidDate = (dateString) => {
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if (!regex_date.test(dateString)) {
      return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1900 || year > 2500 || month == 0 || month > 12) {
      return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  const handleFirstName = (event) => {
    const val = event.target.value;
    if (val.length >= 2) {
      setFirstNameIsValid(true);
      setFnDirty(false);
    } else {
      setFirstNameIsValid(false);
      setFnDirty(true);
    }
    setFirstName(val);
  };

  const handleLastName = (event) => {
    const val = event.target.value;
    if (val.length >= 2) {
      setLastNameIsValid(true);
      setLnDirty(false);
    } else {
      setLastNameIsValid(false);
      setLnDirty(true);
    }
    setLastName(val);
  };

  const handlePassword = (event) => {
    const val = event.target.value;
    if (val.length >= 8) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
    setPassword(val);
    setUnhashedPassword(val);
  };

  const handleConfirm = (event) => {
    const val = event.target.value;
    if (unhashedPassword === val) {
      setConfirmIsValid(true);
    } else {
      setConfirmIsValid(false);
    }
    setConfirmPassword(val);
  };

  const handleBirthday = (event) => {
    const val = event.target.value;
    const validateBday = isValidDate(val);

    if (validateBday) {
      setBirthdayIsValid(true);
    } else {
      setBirthdayIsValid(false);
    }
    setBirthday(val);
  };

  const handleGender = (event) => {
    const val = event.target.value;
    console.log("val");
    if (val.length > 0) {
      setGenderIsValid(true);
    } else {
      setGenderIsValid(false);
    }
    setGender(val);
  };

  const getUserInfo = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    axios
      .get(`/users/all_info?token=${tk.token}`)
      .then((response) => {
        console.log("response: ", response);
        const user = response.data.user;
        setName(user.first_name + " " + user.last_name);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setBirthday(user.birthday.split("T")[0]);
        setGender(user.gender);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    getUserInfo();
    setFirstNameIsValid(true);
    setLastNameIsValid(true);
    setBirthdayIsValid(true);
    setGenderIsValid(true);

    setFnDirty(false);
    setLnDirty(false);
    setBirthdayDirty(false);
    setGenderDirty(false);
    setPasswordDirty(false);
    setConfirmDirty(false);
  };

  const handleUpdate = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    if (allValid) {
      const user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password_hash,
        birthday: birthday,
        token: tk.token,
        gender: gender,
      };
      axios
        .post(`${uriBase}/users/edit`, user)
        .then((res) => console.log("response: ", res))
        .catch((error) => console.error(`Error: ${error}`));
      setOpen(false);
      getUserInfo();
    } else {
      if (isFirstNameValid === false) setFnDirty(true);
      if (isLastNameValid === false) setLnDirty(true);
      if (isBirthdayValid === false) setBirthdayDirty(true);
      if (isGenderValid === false) setGenderDirty(true);
    }
  };

  const handleClickOpenChangePw = () => {
    setOpenChangePw(true);
  };

  const handleCloseChangePw = () => {
    setOpenChangePw(false);
  };

  const handleCancelChangePw = () => {
    setOpenChangePw(false);
    setPasswordDirty(false);
    setConfirmDirty(false);
  };

  const handleChangePassword = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    if (isPasswordValid && isConfirmValid) {
      const user = {
        password: password_hash,
        token: tk.token,
      };
      axios
        .post(`${uriBase}/users/changepassword`, user)
        .then((res) => console.log("response: ", res))
        .catch((error) => console.error(`Error: ${error}`));
      setOpenChangePw(false);
      getUserInfo();
    } else {
      if (isPasswordValid === false) setPasswordDirty(true);
      if (isConfirmValid === false) setConfirmDirty(true);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {};

  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "55%",
    // textAlign: "left",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const background = {
    backgroundColor: "#FFF6F1",
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "#FFFFFF",
    fontSize: "20px",
    paddingTop: "10px",
    paddingBottom: "0px",
    textAlign: "left",
  };

  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "#FFFFFF",
            fontSize: "30px",
            fontWeight: 600,
            marginTop: "-30px",
            paddingBottom: "20px",
            textAlign: "left",
          }}
        >
          Profile Info
        </Typography>
        <Grid
          container
          spacing={0}
          padding="10px"
          style={{ border: "0px", marginTop: "0px", marginBottom: "0px" }}
          columns={2}
        >
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            <Typography style={typeStyle}>Name: {name}</Typography>
            <Typography style={typeStyle}>Email: {email}</Typography>
            <Typography style={typeStyle}>Birthday: {birthday}</Typography>
            <Typography style={typeStyle}>Gender: {gender}</Typography>
            <Typography style={typeStyle}>
              Subscription Type: {subscription}
            </Typography>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "0px",
                textAlign: "center",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#919E6A",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginTop: "-40px",
                  textAlign: "left",
                }}
                onClick={handleClickOpen}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "-70px",
                textAlign: "center",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#919E6A",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                  textAlign: "left",
                }}
                onClick={handleClickOpenChangePw}
              >
                Change Password
              </Button>
            </Grid>
            {/* <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "0px",
                marginBottom: "-10px",
                textAlign: "center",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#919E6A",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                  textAlign: "center",
                }}
              >
                Change Subscription Type
              </Button>
            </Grid> */}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-40px",
              marginBottom: "0px",
              textAlign: "center",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "grey",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
              onClick={() => setOpenDelete(true)}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#ACD7AB",
              boxShadow: "none",
              color: "white",
            },
          }}
        >
          <DialogTitle style={{ color: "white" }}>Update Profile</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "white" }}>
              Please fill out the form to update any part of your profile
            </DialogContentText>
            <TextField
              margin="dense"
              id="firstName"
              label="First Name"
              type="name"
              defaultValue={name.split(" ")[0]}
              fullWidth
              inputProps={{ className: classes.input }}
              error={fnDirty && isFirstNameValid === false}
              helperText={
                fnDirty && isFirstNameValid === false
                  ? "Name must at least 2 characters"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handleFirstName}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="name"
              error={lnDirty && isLastNameValid === false}
              helperText={
                lnDirty && isLastNameValid === false
                  ? "Name must at least 2 characters"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handleLastName}
              defaultValue={name.split(" ")[1]}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="date"
              label="Birthday"
              defaultValue={birthday}
              onBlur={() => setBirthdayDirty(true)}
              error={birthdayDirty && isBirthdayValid === false}
              helperText={
                birthdayDirty && isBirthdayValid === false
                  ? "Please enter valid birthday"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handleBirthday}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              select
              margin="dense"
              id="gender"
              label="Gender"
              type="gender"
              defaultValue={gender}
              fullWidth
              error={genderDirty && isGenderValid === false}
              helperText={
                genderDirty && isGenderValid === false
                  ? "Please select gender"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onChange={handleGender}
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            >
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"nonbinary"}>Nonbinary</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </TextField>
            {/* <TextField
              margin="dense"
              id="subscription"
              label="Change subscription Type"
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} style={{ color: "white" }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              style={{ backgroundColor: "#919E6A", color: "white" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openChangePw}
          onClose={handleCloseChangePw}
          PaperProps={{
            style: {
              backgroundColor: "#ACD7AB",
              boxShadow: "none",
              color: "white",
            },
          }}
        >
          <DialogTitle style={{ color: "white" }}>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "white" }}>
              Please fill out the form to change your password
            </DialogContentText>
            <TextField
              margin="dense"
              type="password"
              id="changePassword"
              label="New Password"
              onBlur={() => setPasswordDirty(true)}
              error={passwordDirty && isPasswordValid === false}
              helperText={
                passwordDirty && isPasswordValid === false
                  ? "Password must be at least 8 characters"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handlePassword}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              type="password"
              id="confirmChangePassword"
              label="Confirm New Password"
              fullWidth
              onBlur={() => setConfirmDirty(true)}
              error={confirmDirty && isConfirmValid === false}
              inputProps={{ className: classes.input }}
              helperText={
                confirmDirty && isConfirmValid === false
                  ? "Password mismatch"
                  : ""
              }
              onInput={handleConfirm}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelChangePw} style={{ color: "white" }}>
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              style={{ backgroundColor: "#919E6A", color: "white" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "#ACD7AB",
              boxShadow: "none",
              color: "white",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "white" }}>
            {"Confirm Delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "white" }}
            >
              Are you sure you want to delete your account? All your data will
              be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDelete}
              style={{ color: "white", backgroundColor: "#919E6A" }}
            >
              Close
            </Button>
            <Button onClick={handleDelete} style={{ color: "white" }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default ProfilePage;
