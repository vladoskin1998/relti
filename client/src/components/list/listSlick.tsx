import React, { ReactElement } from "react";
import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { baseURL } from '../../config'

export default function ListSlich({ images,open=false }: { images: string[],open?:boolean }): ReactElement {

    let settings = {
        dots: false,
        infinite: true,
        nextArrow: open ? <ArrowCircleRightIcon/> : <></>,
        prevArrow: open ? <ArrowCircleLeftIcon/> : <></>,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) =>
                <Box className="list__item" key={image + index}>
                <CardMedia
                    component="img"
                    image={`${baseURL}/images/${image}`}
                    alt="Not found images"
                    className="list__item-img"
                />
                </Box>
            )}

        </Slider>
    );
}

