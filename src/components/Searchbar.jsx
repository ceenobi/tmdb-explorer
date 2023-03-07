import { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import SearchResult from './SearchResult'

export default function Searchbar() {
  const [searchquery, setSearchQuery] = useState('')
  const [resultBox, setResultBox] = useState(false)

  useEffect(() => {
    if (searchquery !== '') {
      setResultBox(true)
    } else {
      setResultBox(false)
    }
  }, [searchquery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery('')
  }

  return (
    <div className='position-relative'>
      <Form onSubmit={handleSubmit}>
        <InputGroup className='position-relative'>
          <input
            type='text'
            placeholder='Search Movies & People'
            className='border-0 border-bottom bg-dark text-white'
            value={searchquery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          {searchquery.length > 0 ? (
            <AiOutlineClose
              className='text-white position-absolute top-50 end-0 translate-middle-y'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setResultBox(false)
                setSearchQuery('')
              }}
            />
          ) : (
            <FiSearch
              type='submit'
              className='text-white position-absolute top-50 end-0 translate-middle-y'
            />
          )}
        </InputGroup>
      </Form>
      {resultBox && (
        <SearchResult searchquery={searchquery} setResultBox={setResultBox} />
      )}
    </div>
  )
}
