import './App.css';
import {LogIn} from "./views/LogIn/LogIn";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./views/Main/Main";
import {useState} from "react";

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LogIn setToken={setToken}
                                                username={username}
                                                setUsername={setUsername}
                                                password={password}
                                                setPassword={setPassword}
                />}/>
                <Route path='main' element={<Main />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
