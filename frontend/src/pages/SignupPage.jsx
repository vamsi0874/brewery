import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, user } = useContext(AuthContext);
  const [error,setError]  = useState(null)
  const navigate = useNavigate();
 
  useEffect(()=>{

  },[user])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, email, password);
      console.log('res',res)
      if(res.message){
        setError(res.message)
        navigate('/signup')
      }

      if(user){
        window.location.reload();
      }

      navigate('/breweries')
 
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <button type="submit">Signup</button>
      <button onClick={()=>navigate('/login')}>log in</button>
    </form>
  );
};

export default SignupPage;
