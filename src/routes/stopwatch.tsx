import React, { useState, useEffect } from 'react'

interface Record {
  time: number
  difference: number
}

export default () => {
  const [time, setTime] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false)
  const [laps, setLaps] = useState<Record[]>([])
  const [history, setHistory] = useState<Record[]>(() => {
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
    setLaps((prevLaps) => {
      const lastLap = prevLaps[0]
      const difference = lastLap ? time - lastLap.time : time
      return [{ time, difference }, ...prevLaps]
    })
  }

  const addRecordToHistory = (newRecord: number) => {
    setHistory((prevHistory) => {
      const lastRecord = prevHistory[0]
      const difference = lastRecord ? newRecord - lastRecord.time : newRecord
      const updatedHistory = [{ time: newRecord, difference }, ...prevHistory]
      return updatedHistory.slice(0, 10) // Keep only the last 10 records
    })
  }

  const formatTime = (time: number) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2)
    const seconds = Math.floor(time / 1000)
    const getSeconds = `0${seconds % 60}`.slice(-2)
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2)
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.setItem('stopwatchHistory', JSON.stringify({}))
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <ul className='list-group'>
        <li>Time one one or many laps.</li>
        <li>
          Saves to <code>localStorage</code> when stopped.
        </li>
      </ul>
      <div>
        <h1>{formatTime(time)}</h1>
      </div>
      <div className='btn-group' role='group'>
        {!running ? (
          <button className='btn btn-outline-primary' onClick={startStopwatch}>
            Start
          </button>
        ) : (
          <button className='btn btn-outline-danger' onClick={stopStopwatch}>
            Stop
          </button>
        )}
        {running && (
          <button className='btn btn-outline-primary' onClick={lapStopwatch}>
            Lap
          </button>
        )}
        <button className='btn btn-outline-primary' onClick={resetStopwatch}>
          Reset
        </button>
        <button className='btn btn-outline-primary' onClick={clearHistory}>
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
                    <strong>Lap {index + 1}</strong> {formatTime(lap.time)}
                    <small className='badge text-bg-primary'>+{formatTime(lap.difference)}</small>
                  </li>
                ))}
              </>
            )}
            {laps.length === 0 && <li className='list-group-item'>No records.</li>}
          </ul>
        </div>
        <div className='col col-md-4'>
          <h2>History</h2>
          <ul className='list-group'>
            {history.length > 0 && (
              <>
                {history.map((record, index) => (
                  <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                    {formatTime(record.time)}
                    <small className='badge text-bg-primary'>+{formatTime(record.difference)}</small>
                  </li>
                ))}
              </>
            )}
            {history.length === 0 && <li className='list-group-item'>No records.</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
