import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";
import DashbordSp from "./Views/DashbordSp";
import DashbordUser from "./Views/DashbordUser";
import Login  from "./Views/Login/Components/Login";
import SignUp  from "./Views/SignUp/Components/SignUp";
import SignUpSp  from "./Views/SignupSp/SignUp";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup-user" component={SignUp} />

          <Route path="/signup-sp" component={SignUpSp} />
          <Route path="/dashborduser" component={DashbordUser} />
          <Route path="/dashbordsp" component={DashbordSp} />
          <Route path="/add-category" component={DashbordSp} />

          
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* <Route path="/user" component={Users} /> */}
          
          {/* <Route
            render={() => {
              if (localStorage.getItem("ctoken")) {
                return <Redirect to='/user' />;
              } 
               else if (localStorage.getItem("sptoken")) {
                return (
                  <Redirect to='/hospitalSubAdmin' />
                );
              } else {
                window.location.href = "/";
              }
            }}
          /> */}
          {/* <Route path="/" component={Login} /> */}
          
          
        </Switch>
      </Router>
    </div>
  );
}
export default App;