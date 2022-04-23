import React, { ReactElement } from "react";
import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function ListSlich({ images }: { images: string[] }): ReactElement {

    let settings = {
        dots: false,
        infinite: true,
        nextArrow: <ArrowCircleRightIcon/>,
        prevArrow: <ArrowCircleLeftIcon/>,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // ${ window.location.href}

    return (
        <Slider {...settings}>
            {images.map((image, index) =>
                <Box className="list__item" key={image + index}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`http://localhost:5000/images/${image}`}
                    alt="Not found images"
                    className="list__item-img"
                />
                </Box>
            )}

        </Slider>
    );
}

