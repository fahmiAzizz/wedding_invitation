import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import gambar1 from "../assets/ls1.jpg";
import gambar2 from "../assets/7.jpg";
import gambar3 from "../assets/8.jpg";
import gambar4 from "../assets/9.jpg";
import gambar5 from "../assets/ls2.jpg";
import gambar6 from "../assets/1.jpg";
import gambar7 from "../assets/2.jpg";
import gambar8 from "../assets/3.jpg";
import gambar9 from "../assets/4.jpg";
import gambar10 from "../assets/5.jpg";
import gambar11 from "../assets/6.jpg";
import gambar12 from "../assets/10.jpg";
import gambar13 from "../assets/11.jpg";

const images = [gambar1, gambar2, gambar3, gambar5, gambar4, gambar6, gambar7, gambar8, gambar9, gambar10, gambar11, gambar12, gambar13,];

const Gallery = () => {

    const gallery = useRef(null);
    const isInView = useInView(gallery, { once: true });
    const mainControls = useAnimation();
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible",)
        }
    }, [isInView])

    const [data, setData] = useState({ img: '', i: 0 });

    const viewImage = (img, i) => {
        setData({ img: img, i: i });
    }

    const imgAction = (action) => {
        let i = data.i;
        if (action === 'next-img') {
            setData({ img: images[i + 1], i: i + 1 })
        }
        if (action === 'prev-img') {
            setData({ img: images[i - 1], i: i - 1 })
        }
        if (!action) {
            setData({ img: '', i: 0 })
        }
    }

    return (
        <motion.div
            className='max-w-screen-mobile mx-auto px-2 py-2'
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            initial='hidden'
            animate={mainControls}
            transition={{ duration: 1, delay: 0.5 }}>
            <p className='py-10 font-customFont text-center font-semibold text-4xl' ref={gallery}>GALLERY</p>
            {data.img && (
                <div className='w-full h-screen bg-black fixed top-0 left-0 flex justify-center items-center overflow-hidden z-50 text-white'>
                    <button onClick={() => imgAction()} className='text-white text-3xl absolute top-3 right-3'>X</button>
                    <MdOutlineArrowBackIos size={30} onClick={() => imgAction('prev-img')} />
                    <img
                        src={data.img}
                        className='max-w-[80%] max-h-[80%]'
                        alt=''
                        onClick={() => setData({ img: '', i: 0 })}
                    />
                    <MdOutlineArrowForwardIos size={30} onClick={() => imgAction('next-img')} />
                </div>
            )}
            <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2 }}>
                <Masonry gutter='10px' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{ width: '100%', display: 'block' }}
                            alt=''
                            onClick={() => viewImage(image, i)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </motion.div>
    );
};

export default Gallery;
