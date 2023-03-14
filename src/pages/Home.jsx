import React, { lazy, useEffect } from 'react'
import { Pagelayout } from '../components'
import useFetchData from '../hooks/useFetchData'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Spinner from '../utils/Spinner'
const MediaCard = lazy(() => import('../components/MediaCard'))

export default function Home() {
  const { error, setPage, newdata, data } = useFetchData('trending/movie/week')
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems() {
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsFetching(false)
    }, 3000)
  }

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    // <div
    //   className='container-md mt-4 mt-lg-0'
    //   style={{ overflowY: '90vh', minHeight: '95vh' }}
    // >
    //   <h1 className='text-white mt-4 mb-4 fs-5'>Trending Movies</h1>
    //   {error && <p className='text-white mt-4 fs-5'>{error.message}</p>}
    //   <React.Suspense fallback={<Spinner />}>
    //     <div className='d-flex flex-wrap gap-3'>
    //       {data.map((movie) => (
    //         <MediaCard {...movie} key={movie.id} />
    //       ))}
    //     </div>
    //   </React.Suspense>
    // </div>
    <Pagelayout heading='Trending Movies' error={error}>
      <React.Suspense fallback={<Spinner />}>
        <div className='d-flex flex-wrap gap-3'>
          {[...newdata, ...data].map((movie, index) => (
            <MediaCard {...movie} key={index} />
          ))}
        </div>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
