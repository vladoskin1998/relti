import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PostItemInterface } from '../../types/types'
import ListSlick from './listSlick'
import Button from '@mui/material/Button';
import { ROLE } from '../../enum/enum'
import { parseToken } from '../../actions/parseToken'
import { api } from '../../api/api'
import LoaderContext from '../../context/context';
import { ALERT } from '../../enum/enum';
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Box from '@mui/material/Box';

export default function ListItem({
    post,
    getList,
}: {
    post: PostItemInterface,
    getList: (n?: number) => void,
}) {

    const { city, street, address, price, _id,
        currency, areas, square, numberOfStoreys, storey } = post
    const { setLoader, setAlert } = useContext(LoaderContext)



    const { accessToken } = useSelector((state: RootState) => state.AuthReducer)

    const filter = useSelector((state: RootState) => state.ChangeFilter)
    const navigation = useNavigate()

    const deletePost = (id: string) => {

        setLoader(true)
        api.post('/post/delete-post', { id: id, filter: filter })
            .then((res: AxiosResponse<{ totalPages: number }>) => {
                setLoader(false)
                setAlert({ status: ALERT.ERROR, message: "Пост успешно удален" })
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
            <CardContent sx={{ '& div::first-letter': { textTransform: "uppercase" } }}>
                <Box sx={{ display: 'flex', columnGap: "5px" }} component="div">
                    <Typography gutterBottom variant="subtitle1" component="span">
                        г.
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {city as unknown as string},
                    </Typography>
                    {
                        areas
                            ?
                            <>
                                <Typography gutterBottom variant="subtitle1" component="span">
                                    р-н.
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {areas as unknown as string},
                                </Typography>
                            </>
                            : <></>
                    }
                    <Typography gutterBottom variant="subtitle1" component="span">
                        ул.
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {`${street}, ${address}`}
                    </Typography>
                </Box>
                <Typography gutterBottom variant="h6" component="div">
                    {`${price} ${currency}`}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Площадь: {square} м<sup>2</sup>
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Этажность: {numberOfStoreys}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Этаж: {storey}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post?.describe ? `Описание: ${post.describe}` : ''}
                </Typography>
                {
                    ROLE.ADMIN === parseToken?.payload(accessToken)?.role
                        ? <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }}>
                            <Button variant="outlined" color="error" onClick={() => deletePost(_id)}>
                                Удалить
                            </Button>
                        </Box>
                        : <></>
                }
            </CardContent>
        </CardActionArea>
    </Card>
    );
}



