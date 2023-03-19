import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io'
import ReactPlayer from 'react-player'

export default function Videobox({ setShowModal, index, setIndex, results }) {
  const prevSlide = () => {
    setIndex(index === 1 ? results.length : (prev) => prev - 1)
  }
  const nextSlide = () => {
    setIndex(index === results.length ? 1 : (prev) => prev + 1)
  }
  const resultSlides = results.map((u) => u.key)
  return (
    <div className='modalbox'>
      <div className='backdrop' />
      <div className='text-white bg-transparent contentbox p-3 rounded-3'>
        <div className='d-flex justify-content-end'>
          <AiOutlineClose
            onClick={() => setShowModal(false)}
            size='1.8rem'
            className='text-white mt-2'
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='mt-3 position-relative'>
          <div className='d-flex justify-content-between w-100 position-absolute top-50'>
            <IoMdArrowDropleftCircle
              onClick={prevSlide}
              size='2rem'
              style={{ cursor: 'pointer' }}
            />
            <IoMdArrowDroprightCircle
              onClick={nextSlide}
              size='2rem'
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='d-flex justify-content-center'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${resultSlides[index]}`}
              controls
              className='react-player'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
