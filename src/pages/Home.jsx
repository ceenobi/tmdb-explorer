import React, { lazy, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
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
    <Pagelayout heading='Trending Movies' error={error}>
      <React.Suspense fallback={<Spinner />}>
        <Row className='gy-2'>
          {[...newdata, ...data].map((movie, index) => (
            <Col xs={6} md={3} xl={2} key={index}>
              <MediaCard {...movie} />
            </Col>
          ))}
        </Row>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
