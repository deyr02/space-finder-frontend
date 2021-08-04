import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import './App.css';
import Login from './login';

interface AppState{
  user: User | undefined;
}

function App() {

  const authService:AuthService = new AuthService();
  return (
    <>
      <div>App from calass works</div>
      <Login authservice={authService} />
    </>
  );
}

export default App;
