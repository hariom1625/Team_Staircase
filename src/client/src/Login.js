import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import {Redirect} from 'react-router-dom';


const options = [
  { value: '0', label: 'Registrar' },
  { value: '1', label: 'Judge' },

]

const customStyles = {
  control: base => ({
    ...base,
    height: 55,
  })
};



function Login(props) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();

 
  const loginUser = () => {
    axios
        .get("https://geolocation-db.com/json/")
        .then((res) => {
          console.log(res, res.data.IPv4);
          const ipAddress = res.data.IPv4;

          const data = { userName, ipAddress };
          axios
            .post("http://localhost:4000/api/user/login", data)
            .then((res) => {})
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      localStorage.setItem("isLoggedIn", "true");
      if(userType==0) window.location.replace("http://localhost:3000/registrarView");
      else if(userType==1) window.location.replace("http://localhost:3000/judgeView");
  }
  const invalidLogin = () => {
    alert("Incorrect credentials");
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        console.log(res, res.data.IPv4);
        const ipAddress = res.data.IPv4;

        const data = { userName, ipAddress };
        axios
          .post("http://localhost:4000/api/user/incorrectCredentials", data)
          .then((res) => {})
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function checkPassword(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/checkCredential",{
        userName: userName,
        password: password,
        userType: parseInt(userType), 
      })
      .then((res) => {
        console.log(res.data);
       if(res.data.data) {console.log("Success");loginUser();}
       else {console.log("Fail");invalidLogin();}
      })
      .catch((error) => {
        // invalidLogin();
        console.log(error);
      });

  }
  return (
    <div className="login" style={{ paddingTop: "100px" }}>
      <main
        class="form-signin"
        style={{
          margin: "auto",
          width: "30vw",
          padding: "50px 30px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <form onSubmit={(e) => checkPassword(e)}>
          {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img> */}
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating" style={{ color: "black" ,marginBottom:"20px",marginTop:"60px"}}>
          <Select styles={customStyles} placeholder={<div style={{color:"black"}}>User Type</div>} options={options} value={options.filter(item => item.value==userType)[0]} onChange={(value) => {setUserType(value.value)}} />
           
          </div>

          <div class="form-floating" style={{ color: "black" }}>
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div
            class="form-floating"
            style={{ marginTop: "20px", color: "black" }}
          >
            <input
              type="password"
              class="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3" style={{ marginTop: "20px" }}>
            <label>
              <input type="checkbox" value="remember-me"></input> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p class="mt-5 mb-3" style={{ color: "white" }}>
            &copy; 2022–2023
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
