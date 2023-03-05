import React from 'react'
import { Button } from 'react-bootstrap'

export default function Error() {
  return (
    <div className='px-4 d-flex justify-content-center align-items-center text-white bg-dark mt-5 vh-100'>
      <div>
        <h1 className='fs-4 mb-6'>
          Oops! An error occurred while fetching this data.
        </h1>
        <Button
          className='rounded-md bg-warning text-dark fw-bold border-0 p-2'
          onClick={() => location.replace('/')}
          style={{width: '150px'}}
        >
          Go Home
        </Button>
      </div>
    </div>
  )
}
