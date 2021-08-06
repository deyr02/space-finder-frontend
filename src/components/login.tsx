import * as React from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { User, UserAttribute } from '../model/Model';
import { AuthService } from '../services/AuthService';
import history from '../utils/history';

interface LoginProps{
    authservice:AuthService,
    setUser:(user:User) =>void,
    setUserAttributes: (userAttributes: UserAttribute[]) => void;
}
interface LoginState{
    userName:string,
    password:string,
    loginAttempted:boolean,
    loginSuccessful:boolean,
}

export default function Login({authservice, setUser, setUserAttributes}: LoginProps){
    
    const[loginState, setLoginState] = useState<LoginState>({
        userName:'',
        password: '',
        loginAttempted: false,
        loginSuccessful: false
    });

    async function handleSubmit(e:any){
        e.preventDefault();
        const result = await authservice.login(loginState.userName, loginState.password);

        if (result){
           setLoginState({...loginState, loginAttempted:true, loginSuccessful:true});
           setUser(result);
           const attributes= await authservice.getUserAttributes(result);
           setUserAttributes(attributes!)
           history.push('/profile');
        }
        else{
           setLoginState({...loginState, loginAttempted:true, loginSuccessful:false});
          
       
        }
    }
   
    function handleInputChange(e:ChangeEvent<HTMLInputElement>){
       const {name, value}= e.target;
        setLoginState({...loginState, [name]: value});
    
      
    }


    return(
        <div>
            <h2>Please Login</h2>
            <form onSubmit={(e)=>handleSubmit(e)} autoComplete="off">
                <input value={loginState.userName} placeholder='User Name' name='userName' onChange={handleInputChange}  /><br/>
                <input value={loginState.password} type="password" placeholder='Password' name='password' onChange={handleInputChange} /><br/>
                <input type='submit' value='Login' />

            </form>
            {
               loginState.loginAttempted ? loginState.loginSuccessful ?
                <label>Login Successfull</label>: <label>Login failed</label>
               : void(0)
            }
        </div>
    );
}