import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import Main from "./Main";
import JudgeMain from "./JudgeMain";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from "react-router-dom";

import { useState } from "react";

function App() {
  const [loggedIn, setLogged] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/registrarView" element={<Main />} />
          <Route exact path="/judgeView" element={<JudgeMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
