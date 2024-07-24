import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BreweryDetail from './components/BreweryDetail';
import PrivateRoute from './PrivateRoute';
import AuthContext, { AuthProvider } from './contexts/AuthContext';
import SearchForm from './components/SearchForm';
import './App.css';

function App() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <AuthProvider>
  
        <div className="App">
          <div className="head"> 
            <h1>Welcome to Brewery</h1>
            <div>
              {user ? (
                <p>
                  {user.email} <button onClick={logout}>Logout</button>
                </p>
              ) : (
                <p>
                </p>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/breweries" element={<PrivateRoute><SearchForm /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<PrivateRoute><SearchForm /></PrivateRoute>} />
            <Route path="/breweries/:id" element={<PrivateRoute><BreweryDetail /></PrivateRoute>} />
          </Routes>
        </div>
     
    </AuthProvider>
  );
}

export default App;
