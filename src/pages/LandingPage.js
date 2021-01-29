import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Landing() {
  const history = useHistory()
  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(token !== 'undefined') history.push('/main')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='container-landing'>
       <Card className='card-landing'  border="secondary">
         <Card.Header>
           <Card.Title>Bienvenido a Dezeer App</Card.Title>
         </Card.Header>
         <Card.Body>
           <Card.Subtitle>
             Encuentra a todos tus artistas y comenta sobre ellos. Solo inicia sesion con tu cuenta.
           </Card.Subtitle>
         </Card.Body>         
       </Card>
       <Image className='imagen-landing' src='LandingImage.jpg'/>
    </div>
  );
}