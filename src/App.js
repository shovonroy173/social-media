import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"

function App() {
  const user  = useSelector((state)=>state.user);
  // console.log(user);
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ (user.currentUser === null) ? <Login/> : <Home/>}/>
      <Route path="/login" element={(user.currentUser === null) ? <Login/> : <Navigate to="/" /> }/>
      <Route path="/register" element={(user.currentUser === null) ? <Register/>:<Navigate to="/"/>}/>
      <Route path="/profile/:id" element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
