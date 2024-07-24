import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login , user} = useContext(AuthContext);
  const [error,setError]  = useState(null)
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login(email, password);
   

      if(res.message){
        setError(res.message)
        navigate('/login'); 
      }
      window.location.reload();
      // if(user){
      //   window.location.reload();
      // }
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <button type="submit">Login</button>
      <button onClick={()=>navigate('/signup')}>sign up</button>
      
    </form>
  );
};

export default LoginPage;
