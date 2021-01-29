import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import Search from '../components/Search';
import ArtistInfo from '../components/ArtistInfo';
import Comments from '../components/Comments';
import Axios from 'axios';
import swal from 'sweetalert'

export default function Main (props) {
    const [artist, setArtist] = useState("")
    
    useEffect(()=>{
        const token = props.location.hash.split(/=|&/)[1]
        localStorage.setItem("token", token)
        Axios({
          method:"GET",
          url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${Math.floor((Math.random() * 100) + 1)}`,
        }).then(data =>{
          setArtist(data.data)        
        }).catch(err =>{
          console.dir(err)
          swal("error", `${err.message}`, "error")
        })
    },[])

  return (
    <Container className="card main-container">
        <Search setArtist={setArtist}/>
        {artist !== "" 
            && 
          <div className="main-content">            
              <ArtistInfo artist={artist}/>            
              <Comments artist={artist}/>            
          </div>
        }
    </Container>
  );
}