import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import geolocation from "geolocation";
import { Link } from "react-router-dom";

export default class SignupSp extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      errors: {},
      loading: false,
      category: "",
      categories: [],
      location: {},
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //   const history = useHistory();
  getLocation = () => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) {
        console.log("couldn't access location");
      } else {
        console.log(position.coords.longitude);
        this.setState({
          location: {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
        });
      }
    });
  };
  componentWillMount() {
    Axios.get("/getCategory", {})
      .then((res) => {
        this.setState({ categories: res.data });
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
      geolocation.getCurrentPosition((err, position) => {
        if (err) {
          console.log("couldn't access location");
        } else {
          console.log(position.coords.longitude);
          this.setState({
            location: {
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            },
          });
        }
      });
  }
  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };
  handleSubmit = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      fullName: this.state.fullName,
      mobileNumber: this.state.mobileNumber,
      user_type: 1,
      category_id: this.state.category,
      location:this.state.location
    };
    axios
      .post("/signupSp", newUserData)
      .then((res) => {
        this.setState({
          loading: false,
        });
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else if (res.data.token) {
          console.log(res.data);
          localStorage.setItem("sptoken", res.data.token);
          window.location.href = "/dashbordsp";
          // window.location.href = "/add-category";
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    return (
      <Grid container>
        <Grid
          item
          md
          style={{
            height: "100vw",
            width: "50vw",
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid
          item
          sm
          container
          style={{ height: "100vh",padding:"2vw" }}
          alignContent="center"
          justify="center"
        >
          <Grid container alignContent="center" justify="center">
            <Typography variant="h2">Signup</Typography>
          </Grid>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              type="text"
              label="Full Name"
              name="fullName"
              onChange={this.handleChange}
              helperText={this.state.errors.fullName}
              value={this.state.fullName}
              fullWidth
              error={this.state.errors.fullName ? true : false}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              onChange={this.handleChange}
              helperText={this.state.errors.email}
              value={this.state.email}
              fullWidth
              error={this.state.errors.email ? true : false}
            />
            <TextField
              type="text"
              label="Mobile Number"
              name="mobileNumber"
              onChange={this.handleChange}
              helperText={this.state.errors.mobileNumber}
              value={this.state.mobileNumber}
              fullWidth
              error={this.state.errors.mobileNumber ? true : false}
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              onChange={this.handleChange}
              helperText={this.state.errors.password}
              value={this.state.password}
              fullWidth
              error={this.state.errors.password ? true : false}
            />
            <TextField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={this.handleChange}
              helperText={this.state.errors.confirmPassword}
              value={this.state.confirmPassword}
              fullWidth
              error={this.state.errors.confirmPassword ? true : false}
            />
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Choose Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.category}
                onChange={this.handleCategoryChange}
                label="Choose category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.categories.length > 0
                  ? this.state.categories.map((category) => (
                      <MenuItem value={category._id}>
                        {category.category}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            {this.state.errors.general && (
              <Typography variant="body2">
                {this.state.errors.general}
              </Typography>
            )}

            <br />
            <br />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.state.loading}
            >
              SignUp
              {this.state.loading && <CircularProgress size={30} />}
            </Button>
          </form>
          <Grid container justify="center">
            <Link onClick={() => this.props.history.replace("/")}>
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
        
      </Grid>
    );
  }
}
