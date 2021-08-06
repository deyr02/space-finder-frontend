import * as React from 'react';
import { User } from '../model/Model';
import {Link} from "react-router-dom";

interface Props{
    user:User| undefined
}

export default function Navbar({user}:Props){
    return(
        <div className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
           
            {
                user?.userName ? 
                <Link to='/Logout' style={{float:'right'}} >{user!.userName}</Link>
                    : 
                <Link to='/login' style={{float:'right'}}>Login</Link>
            }
            
        </div>
    )
}