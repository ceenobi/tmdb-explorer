import { useEffect, useState } from 'react'
import { API_KEY, BASE_URL, options } from '../api/config'
import axios from 'axios'

export default function useFetchData(api) {
  const [data, setData] = useState([])
  const [newdata, setNewData] = useState([])
  const [dataId, setDataId] = useState(null)
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let revokeRequest = false
    if (!api || !api.trim()) return
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/${api}?api_key=${API_KEY}&language=en-US&page=${page}`,
          options
        )
        const movieList = response.data.results
        setDataId(response.data)
        setGenres(response.data.genres)
        setData(movieList)
        setNewData([...newdata, ...data])
        if (revokeRequest) return
      } catch (err) {
        if (revokeRequest) return
        console.error(err)
        setError(err)
      }
    }
    fetchData()
    return function cleanup() {
      revokeRequest = true
    }
  }, [api, page])

  return {
    data,
    error,
    genres,
    dataId,
    setPage,
    newdata,
  }
}
