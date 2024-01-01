import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/HomePage/Home';
import AddJob from './Components/AddJob/AddJob';
import EditJob from './Components/EditJob/EditJob';
import ViewJob from './Components/ViewJob/ViewJob';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addJob' element={<AddJob />} />
            <Route path='/editJob/:jobId' element={<EditJob />} />
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path='/viewJob/:jobId' element={<ViewJob />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
