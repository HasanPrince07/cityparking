import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { contextapi } from './components/Contextapi';
import Header from './components/Header';
import Addentry from './screen/Addentry';
import Adminlogin from './screen/Adminlogin';
import Dashboard from './screen/Dashboard';
import Home from './screen/Home';
import Printout from './screen/Printout';
import Profile from './screen/Profile';
import Userlogin from './screen/Userlogin';
import Usersignup from './screen/Usersignup';

function App() {
  const [gusername, setGusername] = useState(window.localStorage.getItem('username'))
  return (
    <>
      <Router>
        <contextapi.Provider value={{ gusername, setGusername }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/userlogin' element={<Userlogin />}></Route>
            <Route path='/usersignup' element={<Usersignup />}></Route>
            <Route path='/adminlogin' element={<Adminlogin />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/addentry' element={<Addentry />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/printout/:id' element={<Printout />}></Route>
          </Routes>
        </contextapi.Provider>
      </Router>
    </>
  );
}

export default App;