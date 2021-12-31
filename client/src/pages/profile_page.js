import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const axios = require("axios");

let uriBase = 'http://localhost:3000';
if (process.env.NODE_ENV == 'production') {
  uriBase = 'https://city-xplore.herokuapp.com'
} else if (process.env.NODE_ENV == 'prod-test') {
  uriBase = 'https://test-xplore.herokuapp.com'
}

const useStyles = makeStyles({
  input: {
    color: "white",
  },
});

const ProfilePage = () => {
  const [alignment, setAlignment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [subscription, setSubscription] = React.useState("Premium");

  const classes = useStyles();

  const getUserInfo = () => {
    let token = localStorage.getItem('token')
    let tk = JSON.parse(token);
    axios
      .get(`/users/all_info?token=${tk.token}`)
      .then((response) => {
        console.log("response: ", response)
        const user = response.data.user;
        setName(user.first_name + " " + user.last_name)
        setEmail(user.email)
        setBirthday(user.birthday)
        setGender(user.gender)
        
      })
      .catch((error) => console.error(`Error: ${error}`));
 
  }


  React.useEffect(() => {
    getUserInfo();
  }, []);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleEditProfile = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
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
                  marginBottom: "-40px",
                  textAlign: "left",
                }}
                onClick={handleEditProfile}
              >
                Edit Profile
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
          {/* <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-30px",
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
            >
              Delete Account
            </Button>
          </Grid> */}
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
              id="name"
              label="Name"
              type="name"
              defaultValue={name}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              defaultValue={email}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="birthday"
              label="Birthday"
              type="birthday"
              defaultValue={birthday}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="gender"
              label="Gender"
              type="gender"
              defaultValue={gender}
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="changePassword"
              label="New Password"
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="confirmChangePassword"
              label="Confirm New Password"
              fullWidth
              inputProps={{ className: classes.input }}
              InputLabelProps={{
                style: { color: "#3f51b5" },
                shrink: true,
              }}
            />
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
            <Button onClick={handleClose} style={{ color: "white" }}>
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#919E6A", color: "white" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default ProfilePage;
