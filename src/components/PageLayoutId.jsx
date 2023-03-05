import React from 'react'
import { Image } from 'react-bootstrap'

export default function PageLayoutId({ children, src, alt, error }) {
  return (
    <div className='mt-md-0 position-relative' style={{ minHeight: '95vh' }}>
      <div className='posterBackdrop'>
        <Image
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        className='container-lg px-2 py-3 '
        style={{ zIndex: 4, position: 'relative' }}
      >
        {error && <p className='text-white mt-4 fs-5'>{error.message}</p>}
        {children}
      </div>
    </div>
  )
}
