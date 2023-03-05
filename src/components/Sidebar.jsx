import React from 'react'
import { NavLink } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { categories } from '../utils/Constants'
import Spinner from '../utils/Spinner'

export default function Sidebar({ setShowMenu }) {
  const { error, genres } = useFetchData('genre/movie/list')
  if (!genres) return <Spinner />
  return (
    <div className='d-flex flex-column gap-2 px-2 px-lg-4 mt-lg-5 scrollbody sideMobile'>
      <h1 className='text-secondary fs-6 mt-2 mt-lg-5 mb-1 mb-lg-3'>
        Discover
      </h1>
      {categories.map((category, i) => (
        <NavLink
          to={`/${category.href}`}
          key={i}
          className={({ isActive }) =>
            isActive ? 'text-warning' : 'text-white'
          }
          onClick={() => setShowMenu(false)}
        >
          <div className='d-flex gap-2 align-items-center py-1'>
            <div style={{ fontSize: '1.3rem' }}>{category.icon}</div>
            <span className='' title={category.name}>
              {category.name}
            </span>
          </div>
        </NavLink>
      ))}
      <hr className='text-white' />
      <h1 className='text-secondary fs-6 mt-1 mt-lg-3 mb-1'>Movie Genres</h1>
      {error && <p className='text-white mt-2 fs-5'>{error.message}</p>}

      {genres.map((genre) => (
        <div key={genre.id} className='mb-0'>
          <NavLink
            to={`/movies/genres/${genre.id}`}
            className={({ isActive }) =>
              isActive ? 'text-warning' : 'text-white'
            }
            onClick={() => setShowMenu(false)}
          >
            <p className='mb-0 small side'>{genre.name}</p>
          </NavLink>
        </div>
      ))}

      <p className='d-lg-none small text-white mt-4 mt-xl-5'>Copyright TMDB 2023</p>
    </div>
  )
}
