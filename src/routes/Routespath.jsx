import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { Error, Layout } from '../components'
import { Genres, Home, MovieId, Person, Popular, Toprated, PersonId } from '../pages'

export default function Routespath() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path='movies/popular' element={<Popular />} />
        <Route path='movies/top_rated' element={<Toprated />} />
        <Route path='person/popular' element={<Person />} />
        <Route path='movies/genres/:id' element={<Genres />} />
        <Route path='movie/:movie_id' element={<MovieId />} />
        <Route path='person/:person_id' element={<PersonId />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}
