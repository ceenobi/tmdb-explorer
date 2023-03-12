import React from 'react'

export default function Pagelayout({children, heading, error}) {
  return (
    <div
      className='container-md mt-4'
      style={{ minHeight: '95vh' }}
    >
      <h1 className='text-white mt-4 mb-4 fs-5'>{heading}</h1>
      {error && <p className='text-white mt-4 fs-5'>{error.message}</p>}
      {children}
    </div>
  )
}
