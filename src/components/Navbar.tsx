import * as React from 'react';
import { User } from '../model/Model';
import {Link} from "react-router-dom";

interface Props{
    user:User| undefined
}

export default function Navbar({user}:Props){
    return(
        <div className='navbar'>
            <Link data-testid = 'home-link' to='/'>Home</Link>
            <Link data-testid= 'space-link' to='/space'>Space</Link>
            <Link data-testid = 'profile-link'  to='/profile'>Profile</Link>
           
            {
                user?.userName ? 
                <Link to='/logout' style={{float:'right'}} >{user!.userName}</Link>
                    : 
                <Link data-testid ='login-link' to='/login' style={{float:'right'}}>Login</Link>
            }
            
        </div>
    )
}