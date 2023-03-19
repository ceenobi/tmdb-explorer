import React from 'react'
import { Image } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io'

export default function Imagebox({
  setShowPicModal,
  index,
  setIndex,
  profiles,
  backdrops,
}) {
  const prevSlide = () => {
    setIndex(index === 1 ? profiles.length : (prev) => prev - 1)
  }
  const prevSlideB = () => {
    setIndex(index === 1 ? backdrops.length : (prev) => prev - 1)
  }
  const nextSlide = () => {
    setIndex(index === profiles.length ? 1: (prev) => prev + 1)
  }
  const nextSlideB = () => {
    setIndex(index === backdrops.length ? 1 : (prev) => prev + 1)
  }
  const imgSlides = profiles?.map((u) => u.file_path)
  const backDrops = backdrops?.slice(0, 25).map((u) => u.file_path)

  return (
    <div className='modalbox'>
      <div className='backdrop' />
      <div className='text-white bg-transparent contentbox p-3 rounded-3'>
        <div className='d-flex justify-content-end'>
          <AiOutlineClose
            onClick={() => setShowPicModal(false)}
            size='1.8rem'
            className='text-white mt-2'
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='mt-3 position-relative boxImg'>
          <div className='d-flex justify-content-between w-100 position-absolute top-50'>
            <IoMdArrowDropleftCircle
              onClick={imgSlides ? prevSlide : prevSlideB}
              size='2rem'
              style={{ cursor: 'pointer' }}
            />
            <IoMdArrowDroprightCircle
              onClick={imgSlides ? nextSlide : nextSlideB}
              size='2rem'
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='text-center'>
            {imgSlides && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${imgSlides[index]}`}
                className='personImg rounded-3'
              />
            )}
            {backDrops && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${backDrops[index]}`}
                className='personImg rounded-3'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
