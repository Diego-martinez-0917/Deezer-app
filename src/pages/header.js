import React, {useState } from 'react';
import { Navbar, Image, Button} from 'react-bootstrap';

export default function Header(){
    const [token,setToken ]=useState('undefined')
    setTimeout(() => {
        const token = localStorage.getItem('token')
        setToken(token)
    }, 10);    
    return(
        <Navbar className='navbar'>
            <Image 
                className='logo'
                src='DeezerLogo.png'
                />
            {token==='undefined'&&
            <Button 
                href={`https://connect.deezer.com/oauth/auth.php?response_type=token&app_id=${process.env.REACT_APP_APP_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&perms=basic_access,offline_access`} 
                size="lg" 
                variant="outline-primary">Iniciar sesion</Button>}
        </Navbar>
    )
}