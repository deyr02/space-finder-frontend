import { useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { User, UserAttribute } from '../model/Model';
import { AuthService } from '../services/AuthService';
import './App.css';
import Login from './login';
import history from '../utils/history';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import { DataService } from '../services/DataService';
import Spaces from './spaces/Spaces';



/*istanbul ignore file */
function App() {

  const authService:AuthService = new AuthService();
  const dataService:DataService = new DataService();
  const[currentUser, setCurrentUser]= useState<User|undefined>({
    userName: undefined,
    email:undefined
  })
  const [currentUserAttributes, setCurrentUserAttributes] =useState<UserAttribute[]>([]);

  function setUser(user:User){
    setCurrentUser(user);
    console.log(user)
  }

  function setUserAttribute(userAttributes:UserAttribute[]){
    setCurrentUserAttributes(userAttributes)
  }
  return (
    <>
      <div className='wrapper'>
       <Router history={history}>

         <div>
           <Navbar user={currentUser}></Navbar>
           <Switch>
             <Route exact path='/' component={Home}/>
             <Route exact path='/space'>
               <Spaces dataService={dataService}></Spaces>
             </Route>
             <Route exact path='/login'>
               <Login authservice={authService} setUser={setUser} setUserAttributes={setUserAttribute} /> 
             </Route>
             <Route exact path='/profile'>
               <Profile  user={currentUser} userAttributes = {currentUserAttributes}></Profile>
             </Route>
           </Switch>
         </div>

       </Router>
      </div>
    </>
  );
}

export default App;
