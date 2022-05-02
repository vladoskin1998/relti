import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PostItemInterface } from '../../types/types'
import ListSlick from './listSlick'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ROLE } from '../../enum/enum'
import { parseToken } from '../../actions/parseToken'
import { api } from '../../api/api'
import LoaderContext from '../../context/context';
import { ALERT } from '../../enum/enum';

export default function ListItem({ post, getList }: { post: PostItemInterface, getList:()=>void }) {

    const { city, street, address, price, _id, currency } = post
    const { setLoader, setAlert } = useContext(LoaderContext)

    const deletePost = (id: string) => {
        
        setLoader(true)
        api.post('/post/delete-post', { id: id })
            .then(() => {
                setLoader(false)
                setAlert(ALERT.ERROR)
                getList()
            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });
    }

    return (
        <Card sx={{ width: 785 }}>
            <CardActionArea>
                <ListSlick images={post?.images || []} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${city}, ${street}, ${address}`}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        {`${price} ${currency}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.describe}
                    </Typography>
                    {
                        ROLE.ADMIN === parseToken.payload?.role
                            ? <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }}>
                                <Button variant="outlined" color="error" onClick={() => deletePost(_id)}>
                                    DELETE
                                </Button>
                            </Box>
                            : <></>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

