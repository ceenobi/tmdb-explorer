import axios from 'axios'
import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, BASE_URL, options } from '../api/config'
import { Pagelayout } from '../components'
import useFetchData from '../hooks/useFetchData'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Spinner from '../utils/Spinner'
const MediaCard = lazy(() => import('../components/MediaCard'))

export default function Genres() {
  const { id } = useParams()
  const [genreList, setGenreList] = useState([])
  const [newGenreList, setNewGenreList] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const { genres } = useFetchData('genre/movie/list')
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems() {
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsFetching(false)
    }, 3000)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}`,
          options
        )
        const movieList = response.data.results
        setGenreList(movieList)
        setNewGenreList([...newGenreList, ...genreList])
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    fetchData()
  }, [id, page])

  useEffect(() => {
    window.scrollTo({ top: '0' })
  }, [id])

  const filterGenreTitle = genres.filter((genre) => genre.id == id)

  if (!genreList) return <Spinner />

  return (
    <Pagelayout
      heading={`${filterGenreTitle.map((title) => title.name)} Movies`}
      error={error}
    >
      <React.Suspense fallback={<Spinner />}>
        <div className='d-flex flex-wrap gap-3'>
          {[...newGenreList, ...genreList].map((movie) => (
            <MediaCard {...movie} key={movie.id} />
          ))}
        </div>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
