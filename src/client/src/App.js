import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Main from './Main';
import { useState } from 'react';

function App() {
  const [loggedIn,setLogged] = useState(false)

  return (
    <div className="App">
      {!loggedIn && <Login setLogged={setLogged} />}
      {loggedIn && <Main></Main>}
    </div>
  );
}

export default App;
