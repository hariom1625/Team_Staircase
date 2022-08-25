import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import Main from "./Main";
import { useState } from "react";

function App() {
  const [loggedIn, setLogged] = useState(false);

  return (
    <div className="App">
      {console.log(localStorage.getItem("isLoggedIn"))}
      {localStorage.getItem("isLoggedIn") === "true" && <Main></Main>}
      {(!localStorage.getItem("isLoggedIn") ||
        localStorage.getItem("isLoggedIn") === "false") && (
        <Login setLogged={setLogged} />
      )}
    </div>
  );
}

export default App;
