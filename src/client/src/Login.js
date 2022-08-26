import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Select from 'react-select'


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

  function checkPassword(e) {
    e.preventDefault();

    console.log(
      userName,
      password,
      process.env.REACT_APP_USERNAME,
      process.env.REACT_APP_PASSWORD
    );
    if (
      (userName === process.env.REACT_APP_USERNAME &&
        password === process.env.REACT_APP_PASSWORD) ||
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      props.setLogged(true);
    } else {
      alert("Wrong Password");
    }
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
          <Select styles={customStyles} placeholder={<div style={{color:"black"}}>User Type</div>} options={options} value={options.filter(item => item.label==userType)[0]} onChange={(value) => {console.log('onchange',value,value.label);setUserType(value.label)}} />
           
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
