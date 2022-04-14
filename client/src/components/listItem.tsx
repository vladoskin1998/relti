import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PostItemInterface } from '../types/types'

export default function ListItem({post}:{post:PostItemInterface}) {

  const {city, street, address, price} = post

  return (
    <Card sx={{ width: 785 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:5000/images/${post?.images[0]}`}
          alt="Not found images"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${city}, ${street}, ${address}`}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {post.describe}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

