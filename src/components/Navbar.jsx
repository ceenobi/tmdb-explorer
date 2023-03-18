import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Container } from 'react-bootstrap'
import { SiThemoviedatabase } from 'react-icons/si'
import { FiMenu } from 'react-icons/fi'
import { Drawer, Searchbar } from './'

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <Container
      fluid
      className='position-fixed top-0 bg-dark shadow-lg'
      style={{ zIndex: 5 }}
    >
      <Stack
        direction='horizontal'
        className='py-2 p-lg-2 justify-content-between'
      >
        <Stack direction='horizontal' gap={2} style={{ cursor: 'pointer' }}>
          <FiMenu
            className='d-lg-none text-white'
            size='1.5rem'
            onClick={() => setShowMenu(true)}
          />
          <Link to='/'>
            <SiThemoviedatabase size='2.5rem' color='orange' />
          </Link>
        </Stack>
        <Searchbar />
      </Stack>
      {showMenu && <Drawer setShowMenu={setShowMenu} />}
    </Container>
  )
}
