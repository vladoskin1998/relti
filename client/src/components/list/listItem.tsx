import React, { useContext, useState } from 'react';
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
import Modal from '@mui/material/Modal';

export default function ListItem({ post, getList }: { post: PostItemInterface, getList: () => void }) {

    const { city, street, address, price, _id, currency } = post
    const { setLoader, setAlert } = useContext(LoaderContext)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deletePost = (id: string) => {

        setLoader(true)
        api.post('/post/delete-post', { id: id })
            .then(() => {
                setLoader(false)
                setAlert({ status: ALERT.SUCCESS, message: "post successful delete" })
                getList()
            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });
    }

    return (<Card className='list-card'>
        <CardActionArea onClick={handleOpen}>
            <ListSlick images={post?.images || []} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {`${city}, ${street}, ${address}`}
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
      
            <Box className="modal__slick">
                <ListSlick images={post?.images || []} open={open} />
            </Box>
        </Modal>
    </Card>
    );
}



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// export default function BasicModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <div>
//             <Button onClick={handleOpen}>Open modal</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Text in a modal
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                     </Typography>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }