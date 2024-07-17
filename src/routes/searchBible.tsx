import React, { useState } from 'react'

interface BibleSearchProps {}

export default () => {
  const [query, setQuery] = useState<string>()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const urlFriendlyQuery = encodeURIComponent(String(query))
      const response = await fetch(`https://bible-api.com/${urlFriendlyQuery}`)
      if (!response.ok) {
        throw new Error('Error fetching data')
      }
      const data = await response.json()
      setResults(data)
    } catch (error: any) {
      setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <p>This is bugged right now: WIP</p>
      <div className='input-group mb-3'>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            className='form-control'
            maxLength={50}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search the Bible...'
            required
          />
          <button onSubmit={handleSearch} className='btn btn-outline-secondary'>
            Search
          </button>
        </form>
      </div>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && (
        <div className='spinner-border text-danger' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}

      <ul>
        {results.map((data, index) => (
          <li key={index}>
            <strong>{data.reference}</strong>: {data.text}
            <p>{data.translate_name}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
