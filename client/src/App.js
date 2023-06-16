import './App.css';
import React from 'react';
import Register from './components/register';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from './components/home';
import CategoryForm from './components/categoryForm';

const AddCategory = () => {
  const location = useLocation();

  return (
    location.pathname === '/home' && (
      <p className='addCategory'>
        go to, <Link to='/categoryForm'>AddCategory here</Link>.
      </p>
    )
  );
};

const CategoryFooter = () => {
  const location = useLocation();

  return (
    location.pathname === '/categoryForm' && (
      <p className='categoryFooter'>
        go to, <Link to='/home'>Home</Link>.
      </p>
    )
  );
};

const RegisterFooter = () => {
  const location = useLocation();

  return (
    location.pathname === '/' && (
      <p className='footerRegister'>
        Have an account, <Link to='/login'>login here</Link>.
      </p>
    )
  );
};

const LoginFooter = () => {
  const location = useLocation();

  return (
    location.pathname === '/login' && (
      <p className='footerLogin'>
        Don't have an account?, <Link to='/'>register here</Link>.
      </p>
    )
  );
};

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <Outlet {...rest} element={<Element />} />
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>📝 TODOER</h1>
        <div className='container'>
          <div className='content'>
            <div>
              <AddCategory />
            </div>
            <Routes>
              <Route exact path='/' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/categoryForm' element={<CategoryForm />} />
              </Route>
            </Routes>
            <RegisterFooter />
            <LoginFooter />
            <CategoryFooter />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
