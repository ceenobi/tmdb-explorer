import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_KEY, BASE_URL, options } from '../../api/config'
import { Imagebox, MediaCard, ScrollButtons } from '../../components'
import useScroll from '../../hooks/useScroll'
import Spinner from '../../utils/Spinner'

export default function PersonId() {
  const [dataId, setDataId] = useState(null)
  const [error, setError] = useState(null)
  const [showPicModal, setShowPicModal] = useState(false)
  const [index, setIndex] = useState(0)
  const { person_id } = useParams()
  const { scroll, scrollRef } = useScroll()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/person/${person_id}}?api_key=${API_KEY}&append_to_response=images,movie_credits`,
          options
        )
        setDataId(response.data)
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    fetchData()
  }, [person_id])

  useEffect(() => {
    if (showPicModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showPicModal])

  useEffect(() => {
    document.title = dataId?.name
  }, [dataId?.name])

  if (!dataId) return <Spinner />
  const {
    name,
    profile_path,
    biography,
    gender,
    birthday,
    place_of_birth,
    images: { profiles },
    movie_credits: { cast },
  } = dataId

  return (
    <div
      className='mt-md-0 position-relative'
      style={{ minHeight: '95vh' }}
    >
      <div className='posterBackdrop'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${profile_path}`}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        className='container-lg px-2 py-3 '
        style={{ zIndex: 4, position: 'relative' }}
      >
        {error && <p className='text-white mt-4 fs-5'>{error.message}</p>}
        <div className='d-md-flex gap-4'>
          <div className='text-center text-md-start mb-4'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              className='rounded-2 media_poster'
              alt={name}
              title={name}
            />
          </div>
          <div className='px-2 text-white'>
            <h1 className='fs-4'>{name}</h1>
            <h1 className='fs-5'>Biography</h1>
            <p className=''>{biography.split(/(?:\r?\n)+/)}</p>
            <h1 className='fs-5'>Personal info</h1>
            <div className='d-flex flex-wrap gap-2'>
              <div>
                <p className='text-secondary mb-0 fw-bold'>Gender</p>
                <p>{gender === 1 ? 'Female' : 'Male'}</p>
              </div>
              <div>
                <p className='text-secondary mb-0 fw-bold'>Birthday</p>
                <p>{birthday}</p>
              </div>
              <div>
                <p className='text-secondary mb-0 fw-bold'>Place of birth</p>
                <p>{place_of_birth}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='px-2 mt-4'>
          <h1 className='text-white fs-5 mt-3 mb-3'>Images</h1>
          <div style={{ position: 'relative' }}>
            <div
              className='d-flex scrollbody'
              style={{
                overflowX: 'scroll',
                overflowY: 'hidden',
                width: '100%',
              }}
              ref={scrollRef}
            >
              {profiles.map((im, index) => (
                <div
                  key={index}
                  className='me-3'
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${im.file_path}`}
                    alt='image'
                    className='rounded-3'
                    loading='lazy'
                    style={{
                      width: '180px',
                      height: '200px',
                    }}
                    onClick={() => {
                      setShowPicModal(true)
                      setIndex(index)
                    }}
                  />
                </div>
              ))}
            </div>
            {profiles.length > 8 && <ScrollButtons scroll={scroll} />}
            {showPicModal && (
              <Imagebox
                setShowPicModal={setShowPicModal}
                index={index}
                setIndex={setIndex}
                profiles={profiles}
              />
            )}
          </div>
        </div>

        <div className='px-2 mt-4'>
          <h1 className='text-white fs-5 mt-3 mb-3'>Castings</h1>
          {cast.length > 0 ? (
            <div className='d-flex flex-wrap gap-3'>
              {cast.map((movie) => (
                <MediaCard {...movie} key={movie.id} />
              ))}
            </div>
          ) : (
            <h1 className='text-secondary fs-5 mt-3 mb-3'>
              No recommendations for {title}
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
