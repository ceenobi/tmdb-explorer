import React, { lazy } from 'react'
import { Col, Row } from 'react-bootstrap'
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
        <Row className='gy-2'>
          {[...newdata, ...data].map((movie) => (
            <Col xs={6} md={3} xl={2} key={movie.id}>
              <MediaCard {...movie} />
            </Col>
          ))}
        </Row>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
