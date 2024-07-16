import React, { useState, useEffect } from 'react'

interface DictionaryResponse {
  word: string
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
    }>
  }>
}

interface HistoryEntry {
  word: string
  response: DictionaryResponse
}

export default () => {
  const [query, setQuery] = useState<string>('')
  const [definition, setDefinition] = useState<DictionaryResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const storedHistory = localStorage.getItem('dictionaryHistory')
    return storedHistory ? JSON.parse(storedHistory) : []
  })

  useEffect(() => {
    if (history.length > 0) {
      const lastEntry = history[0]
      setQuery(lastEntry.word)
      setDefinition(lastEntry.response)
    }
  }, [])

  useEffect(() => {
    if (query.length === 0) {
      setDefinition(null)
      return
    }

    const fetchDefinition = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        if (!response.ok) {
          throw new Error('Definition not found')
        }
        const data: DictionaryResponse[] = await response.json()
        setDefinition(data[0])
        setError(null)
        setHistory((prevHistory) => {
          const updatedHistory = [
            { word: query, response: data[0] },
            ...prevHistory.filter((entry) => entry.word !== query),
          ]
          localStorage.setItem('dictionaryHistory', JSON.stringify(updatedHistory.slice(0, 10)))
          return updatedHistory.slice(0, 10)
        })
      } catch (error) {
        setError((error as Error).message)
        setDefinition(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDefinition()
  }, [query])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.setItem('dictionaryHistory', JSON.stringify([]))
  }

  const handleHistoryClick = (entry: HistoryEntry) => {
    setQuery(entry.word)
    setDefinition(entry.response)
    setError(null)
  }

  return (
    <div>
      <h1>Dictionary</h1>
      <ul>
        <li className='list-group-item'>
          API Call using <code>fetch API</code>
        </li>
        <li className='list-group-item'>
          Using <code>localStorage</code> to store history.
        </li>
      </ul>
      <input
        className='form-control'
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Enter a word to lookup'
      />
      <div className='row'>
        <div className='col col-md-6'>
          <h2 className='mt-3'>Word: {definition?.word}</h2>
          {loading && (
            <div className='spinner-border text-danger' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          )}
          {error && <p className='alert alert-danger'>{error}</p>}
          {definition && !loading && (
            <>
              {definition.meanings.map((meaning, index) => (
                <ol key={index} className='list-group list-group-numbered'>
                  <li className='list-group-item active'>{meaning.partOfSpeech}</li>
                  {meaning.definitions.map((def, index) => (
                    <li className='list-group-item' key={index}>
                      {def.definition}
                      {def.example && <em> - {def.example}</em>}
                    </li>
                  ))}
                </ol>
              ))}
            </>
          )}
        </div>
        <div className='col col-md-3'>
          <h2 className='mt-3'>
            History{' '}
            <button className='btn btn-sm btn-danger' onClick={clearHistory}>
              Clear
            </button>
          </h2>
          <ul className='list-group list-group-numbered'>
            {history.map((entry, index) => (
              <li className='list-group-item' key={index} onClick={() => handleHistoryClick(entry)}>
                <a href='#'>{entry.word}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
