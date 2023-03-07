import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from './'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='d-lg-flex w-100 bg-dark'>
        <div className='sideDesktop'>
          <div className='d-none d-lg-block position-fixed top-0 start-0'>
            <Sidebar />
            <p className='small text-white px-4 mt-4 mt-xl-5'>
              Copyright TMDB 2023
            </p>
          </div>
        </div>
        <div className='sideA bg-dark mt-5 py-2'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
