import React, { lazy } from 'react'
import { Pagelayout } from '../../components'
import useFetchData from '../../hooks/useFetchData'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Spinner from '../../utils/Spinner'
const MediaCard = lazy(() => import('../../components/MediaCard'))

export default function Popular() {
  const { error, data, newdata, setPage } = useFetchData('movie/popular')
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems() {
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsFetching(false)
    }, 3000)
  }

  return (
    <Pagelayout heading='Popular' error={error}>
      <React.Suspense fallback={<Spinner />}>
        <div className='d-flex flex-wrap gap-3'>
          {[...newdata, ...data].map((movie) => (
            <MediaCard {...movie} key={movie.id} />
          ))}
        </div>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
