import React, { lazy, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Pagelayout } from '../../components'
import useFetchData from '../../hooks/useFetchData'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Spinner from '../../utils/Spinner'
const PersonCard = lazy(() => import('../../components/PersonCard'))

export default function Person() {
  const { error, data, newdata, setPage } = useFetchData('person/popular')
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems() {
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsFetching(false)
    }, 3000)
  }

  useEffect(() => {
    document.title = 'Popular People'
  }, [])

  return (
    <Pagelayout heading='Trending People' error={error}>
      <React.Suspense fallback={<Spinner />}>
        <Row className='gy-2'>
          {[...newdata, ...data].map((person) => (
            <Col xs={6} md={3} xl={2} key={person.id}>
              <PersonCard {...person} />
            </Col>
          ))}
        </Row>
      </React.Suspense>
      {isFetching && <Spinner />}
    </Pagelayout>
  )
}
