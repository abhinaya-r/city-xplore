import React from "react";

let activities = []



const Recommendations = () => {
  const addRestaurant = () => {
    activities.push("restaurant");
    console.log("restaurant");
  }
  const addBar = () => {
    activities.push("bar");
    console.log("bar");
  }
  const addMuseum = () => {
    activities.push("museum");
    console.log("museum");
  }
  const addDessert = () => {
    activities.push("dessert");
    console.log("dessert");
  }
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const background = {
    backgroundColor: "#FFF6F1",
  };
  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
          <Typography
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "white",
              fontSize: "30px",
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            Choose one or more of the categories in order:
          </Typography>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
                onClick={() => {console.log("restaurant");}}
              value={"Restaurants"}
              style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              Restaurants
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              Bars (21+)
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              Desserts
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              Museums
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "30px",
                paddingTop: "30px",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              Input Address:
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "20px",
              marginBottom: "10px",
              paddingTop: "0px",
            }}
          >
            <TextField
              id="filled-basic"
              variant="filled"
              margin="none"
              style={{ paddingTop: "0px", paddingBottom: "0px" }}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Link
              to="/itinerary"
              style={{
                color: "white",
                font: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            >
              <Button
                as="input"
                type="submit"
                value="Submit"
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "7px",
                  justifyContent: "center",
                  fontSize: "15px",
                }}
              >
                Get Itinerary
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Recommendations;
