import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_KEY, BASE_URL, options } from '../api/config'
import Spinner from '../utils/Spinner'

export default function SearchResult({ searchquery, setResultBox }) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getSearch = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchquery}`,
          options
        )
        setData(response.data.results)
      } catch (error) {
        console.error(error)
        setError(error)
      }
    })
    return () => clearTimeout(getSearch)
  }, [searchquery])

  if (!data) return <Spinner />

  const filteredResults = data?.filter((content) => {
    if (content.media_type == 'tv') {
      return
    } else {
      return content.title || content.name
    }
  })

  return (
    <div
      className='position-absolute top-25 mt-2 text-white py-2 bg-dark searchResult'
      style={{ height: '350px', overflowY: 'scroll' }}
    >
      {error && <p className='text-white mt-4 fs-5'>{error.message}</p>}
      {filteredResults.length > 0 ? (
        <>
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className='d-flex align-items-center gap-3 px-3 py-2 mb-0 hover-me'
            >
              <Link
                to={
                  result.title ? `/movie/${result.id}` : `/person/${result.id}`
                }
                onClick={() => setResultBox(false)}
              >
                <Image
                  src={
                    result.title
                      ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                      : `https://image.tmdb.org/t/p/original/${result.profile_path}`
                  }
                  className='img-fluid rounded-circle'
                  alt={result.title ? result.title : result.name}
                  title={result.title ? result.title : result.name}
                  loading='lazy'
                  style={{ width: '40px', height: '40px' }}
                />
              </Link>
              <div>
                <Link
                  to={
                    result.title
                      ? `/movie/${result.id}`
                      : `/person/${result.id}`
                  }
                  onClick={() => setResultBox(false)}
                >
                  <p className='text-white small fw-bold mb-0'>
                    {result.title ? result.title : result?.name}
                  </p>
                </Link>
                <p className='text-secondary small'>
                  {result.title && result.release_date.slice(0, 4)}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className='px-4'>No result</p>
      )}
    </div>
  )
}
