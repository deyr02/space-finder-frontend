import { Link } from 'react-router-dom';
import { User, UserAttribute } from '../model/Model';


interface Props{
    user: User|undefined,
    userAttributes: UserAttribute[]
}

export default  function Profile({user, userAttributes}:Props){

    return(
        <div>
            <h1> Welcome to profile Page</h1>
            { user?.userName ?
                <h3>Hello {user.userName}</h3>
                :
                <h3>Please <Link to='/login'> Login</Link></h3>    
            }
            {user?.userName?
                <>
                <h4>Here are your attributes</h4>
                 <table>
                     <tbody>
                         {userAttributes.map(row =>(
                             <tr key={row.Name}>
                                 <td>{row.Name}</td>
                                 <td>{row.Value}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                </>
                :
                void(0)
            }
        </div>
    )
}