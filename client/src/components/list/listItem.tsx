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
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export default function ListItem({
    post,
    getList,
}: {
    post: PostItemInterface,
    getList: (n?: number) => void,
}) {

    const { city, street, address, price, _id, currency, areas } = post
    const { setLoader, setAlert } = useContext(LoaderContext)

    const filter = useSelector((state: RootState) => state.ChangeFilter)
    const navigation = useNavigate()

    const deletePost = (id: string) => {

        setLoader(true)
        api.post('/post/delete-post', { id: id, filter: filter })
            .then((res: AxiosResponse<{ totalPages: number }>) => {
                setLoader(false)
                setAlert({ status: ALERT.SUCCESS, message: "post successful delete" })
                getList(res.data.totalPages)
            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });
    }

    return (<Card className='list-card'>
        <CardActionArea >
            <Box onClick={() => navigation(`/slick`, { state: { images: post?.images } })}>
                <ListSlick images={post?.images || []} />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {`${city.label}, ${areas.label}, ${street.label}, ${address}`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
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



