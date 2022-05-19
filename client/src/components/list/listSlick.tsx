import React, { ReactElement, useState, useEffect } from "react";
import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { baseURL } from '../../config'
import Pagination from '@mui/material/Pagination';

export default function ListSlich({ images, open = false }: { images: string[], open?: boolean }): ReactElement {

    const [page, setPage] = useState(1)

    let settings = {
        dots: false,
        infinite: true,
        nextArrow: open ? <ArrowCircleRightIcon /> : <></>,
        prevArrow: open ? <ArrowCircleLeftIcon /> : <></>,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index: number) => setPage(index + 1),
    };




    return (
        <>
            <Slider {...settings}>
                {images.map((image, index) =>
                    <Box className="list__item" key={image + index}>
                        <CardMedia
                            component="img"
                            image={page === index + 1 ? `${baseURL}/images/${image}` : ''}
                            alt="Not found images"
                            className="list__item-img"
                        />
                    </Box>
                )}
            </Slider>
            {
                !open
                    ? <Pagination color="primary" page={page} count={images.length} hidePrevButton hideNextButton size="small" sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }} />
                    : <></>
            }

        </>
    );
}

