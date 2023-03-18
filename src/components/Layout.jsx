import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from './'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='d-lg-flex'>
        <div className='d-none d-lg-block' style={{ width: '250px' }}>
          <div className='position-fixed top-0 start-0 sideAdjust scrollbody'>
            <Sidebar />
          </div>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
