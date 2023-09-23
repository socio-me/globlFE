import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageSlider from './ImageSlider';
import image1 from '../assets/image 1.png'
import image2 from '../assets/image 2.svg'
const Discover = () => {

    return ( 
        <div id='discover' className='w-[70%] mx-auto ' >
             <h2 className="text-center mt-12 font-inter text-4xl font-bold mb-8">
           Discover
      </h2>
      <ImageSlider />
 
        </div>
     );
}
 
export default Discover;