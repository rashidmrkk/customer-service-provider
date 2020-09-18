import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/login", userData)
      .then((res) => {
        this.setState({ loading: false });
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else if (res.data.token) {
          console.log(res.data);
          this.setState({ loading: false });
          if (res.data.user_type === 0) {
            localStorage.setItem("utoken", res.data.token);
            window.location.href = "/dashborduser";
          } else if (res.data.user_type === 1) {
            localStorage.setItem("sptoken", res.data.token);
            window.location.href = "/dashbordsp";
          }
        }
      })
      .catch((error) => {
        // const errorMsg = error.message
        console.log(error);
      });
  };

  render() {
    return (
      <Grid container>
        <Grid item md style={{
          height:"100vw",
          width:"50vw",
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

        </Grid>
        <Grid item sm container style={{height:"100vh"}} alignContent="center" justify="center">
          <Grid container alignContent="center" justify="center"><Typography variant="h2">Login</Typography></Grid>
          <form noValidate onSubmit={this.handleSubmit}>
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
              type="password"
              label="Password"
              name="password"
              onChange={this.handleChange}
              helperText={this.state.errors.password}
              value={this.state.password}
              fullWidth
              error={this.state.errors.password ? true : false}
            />
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
              Login
              {this.state.loading && <CircularProgress size={30} />}
            </Button>
          </form>
          <Grid container justify="center">
                <Link onClick={()=>this.props.history.replace("/signup-user")}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
        </Grid>
        
      </Grid>
    );
  }
}
