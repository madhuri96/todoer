import './App.css';
import React from 'react';
import Register from './components/register';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>📝 TODOER</h1>
        <div className='container'>
          <div className='app-container'>
            <h3>Welcome !</h3>
            <p>
              Don't have an account?, <Link to='/register'>register here</Link>.
            </p>
            <p>
              Have an account, <Link to='/login'>login here</Link>.
            </p>
          </div>
          <div className='content'>
            <Routes>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/home' element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
