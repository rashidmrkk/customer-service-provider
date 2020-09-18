import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import geolocation from "geolocation";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  root: {
    borderTopRightRadius:"20px",
    borderTopLeftRadius:"20px"
  },
  media: {
    height: 180,
    width:"100%"
  },
}));

export default function Dashbord() {
  var [loading, setLoading] = useState(true);
  const classes = useStyles();

  var [categories, setCategories] = useState([]);
  var [category, setCategory] = useState("");
  var [providers, setProviders] = useState([]);
  var [location, setLocation] = useState({});

  //   const history = useHistory();

  useEffect(() => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) {
        console.log("couldn't access location");
      } else {
        console.log(position.coords.longitude);
        setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      }
    });
    Axios.get("/getCategory", {})
      .then((res) => {
        setLoading(false);
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
      });
  }, []);
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    Axios.post("/getUsersInCategory", {
      lat: location.lat,
      lng: location.lng,
      category_id: event.target.value,
    })
      .then((res) => {
        setProviders(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };
  return (
    <Grid container>
      <Grid item sm />
      <Grid item sm style={{ marginTop: "15px" }}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Choose Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={category}
            onChange={handleChange}
            label="Choose category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.length > 0
              ? categories.map((category) => (
                  <MenuItem value={category._id}>{category.category}</MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm />
      <Grid container style={{ padding: "1vw" }}>
        {category !== "" ? (
          providers.length > 0 ? (
            providers.map((provider) => (
              <Grid item lg={3} md={4} sm={6} xs={6}>
                <Card className={classes.root}  title={provider.name}>
                  <CardMedia
                    className={classes.media}
                    image="data:image/png;base64,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"
                    title={provider.name}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontSize: "20px" }}
                    >
                      {provider.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontSize: "20px" }}
                    >
                      {provider.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <h5>no match found near your location</h5>
          )
        ) : null}
      </Grid>
    </Grid>
  );
}
