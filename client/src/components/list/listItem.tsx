import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PostItemInterface } from '../../types/types'
import ListSlick from './listSlick'

export default function ListItem({ post }: { post: PostItemInterface }) {

    const { city, street, address, price } = post

    return (
        <Card sx={{ width: 785 }}>
            <CardActionArea>
                <ListSlick images={post?.images || []}/>
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

