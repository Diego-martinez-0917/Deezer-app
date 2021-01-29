import React from 'react';
import { Badge, Card, Image } from 'react-bootstrap';

export default function ArtistInfo({artist}) {

  return (
        <Card className="card-info">
            <Card.Header><Card.Title>{artist.name}</Card.Title></Card.Header>
            <Card.Body>
                <Image className='image-artist' variant="top" src={artist.picture_medium} />
                <Card.Title className='title-album'>Numero de albumes </Card.Title>
                <Card.Text className='text-album'>{artist.nb_album}</Card.Text>
                <Card.Title className='title-fans'>Numero de fans </Card.Title>
                <Card.Text className='text-fans'>{artist.nb_fan}</Card.Text>
                {artist.radio && <Badge className='badge-radio' variant='primary'>Disponible en radio</Badge>}
                <Card.Text className='text-link'>
                Escucha este artista ahora mismo en <a href={artist.link}>Deezer</a>
                </Card.Text>
            </Card.Body>
        </Card>
  );
}