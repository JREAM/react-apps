import React, { useState, useEffect } from 'react'

export default () => {
  const [time, setTime] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false)
  const [laps, setLaps] = useState<number[]>([])
  const [history, setHistory] = useState<number[]>(() => {
    const storedHistory = localStorage.getItem('stopwatchHistory')
    return storedHistory ? JSON.parse(storedHistory) : []
  })

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!running && timer !== null) {
      clearInterval(timer)
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer)
      }
    }
  }, [running])

  useEffect(() => {
    localStorage.setItem('stopwatchHistory', JSON.stringify(history))
  }, [history])

  const startStopwatch = () => {
    setRunning(true)
  }

  const stopStopwatch = () => {
    setRunning(false)
    addRecordToHistory(time)
  }

  const resetStopwatch = () => {
    setRunning(false)
    setTime(0)
    setLaps([])
  }

  const lapStopwatch = () => {
    setLaps([...laps, time])
  }

  const addRecordToHistory = (newRecord: number) => {
    setHistory((prevHistory) => {
      const updatedHistory = [newRecord, ...prevHistory]
      return updatedHistory.slice(0, 10) // Keep only the last 10 records
    })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.setItem('stopwatchHistory', JSON.stringify({}))
  }

  const formatTime = (time: number) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2)
    const seconds = Math.floor(time / 1000)
    const getSeconds = `0${seconds % 60}`.slice(-2)
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2)
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <ul>
        <li>Stop Watch to track one or many laps.</li>
        <li>
          Saves to <code>localStorage</code> when stopped.
        </li>
      </ul>
      <div>
        <h1>{formatTime(time)}</h1>
      </div>
      <div>
        {!running ? (
          <button className='btn btn-primary' onClick={startStopwatch}>
            Start
          </button>
        ) : (
          <button className='btn btn-danger' onClick={stopStopwatch}>
            Stop
          </button>
        )}
        {running && (
          <button className='btn btn-warning' onClick={lapStopwatch}>
            Lap
          </button>
        )}
        <button className='btn btn-info' onClick={resetStopwatch}>
          Reset
        </button>
        <button className='btn btn-danger' onClick={clearHistory}>
          Clear History
        </button>
      </div>
      <div className='row'>
        <div className='col col-md-4'>
          <h2>Laps</h2>
          <ul className='list-group'>
            {laps.length > 0 && (
              <>
                {laps.map((lap, index) => (
                  <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                    <strong>Lap {index + 1}</strong>: {formatTime(lap)}
                  </li>
                ))}
              </>
            )}
            {laps.length === 0 && <li className='list-group-item'>No records found</li>}
          </ul>
        </div>
        <div className='col col-md-4'>
          <h2>History</h2>
          <ul className='list-group'>
            {history.length > 0 && (
              <>
                {history.map((record, index) => (
                  <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                    {formatTime(record)}
                  </li>
                ))}
              </>
            )}
            {history.length === 0 && <li className='list-group-item'>No records found</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
