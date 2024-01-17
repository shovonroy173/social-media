import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
// import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Profile";
import {BrowserRouter , Routes , Route , Redirect} from "react-router-dom"

function App() {
  const user  = false;
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user ? <Home/> : <Register/>}/>
      <Route path="/" element={user ? <Redirect to="/" /> : <Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
