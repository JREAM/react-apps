import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import { KeyboardEvent } from 'react'

interface Task {
  id: number
  text: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const [newTask, setNewTask] = useState<string>('')
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [editTask, setEditTask] = useState<string>('')
  const editInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
      }
      setTasks([...tasks, newTaskObj])
      setNewTask('')
    }
  }

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  const saveTask = (id: number) => {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, text: editTask } : task))
    setTasks(newTasks)
    setIsEditing(null)
    setEditTask('')
  }

  useEffect(() => {
    if (isEditing !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  const handleKeyDownAdd = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask()
    }
    // Cast the event to an HTMLInput to get the value
    // const input = event.target as HTMLInputElement
    // console.log(input.value)
    // if (input.value !== '') {}
  }

  const handleKeyDownEdit = (event: KeyboardEvent<HTMLInputElement>, id: number) => {
    if (event.key === 'Enter') {
      saveTask(id)
    } else if (event.key === 'Escape') {
      setIsEditing(null)
      setEditTask('')
    }
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        <li>
          Saves to <code>localStorage</code>
        </li>
        <li>
          Listens for <kbd>Enter</kbd> and <kbd>Escape</kbd>
        </li>
      </ul>
      <div className='input-group'>
        <div className='form-floating mb-3'>
          <input
            className='form-control'
            type='text'
            maxLength={80}
            value={newTask}
            id='inputTask'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownAdd(e)}
            placeholder='New task'
          />
          <label htmlFor='inputTask'>New Task</label>
        </div>
      </div>
      <div className='container'>
        {tasks.map((task) => (
          <div key={task.id} className='row mb-3'>
            {isEditing === task.id ? (
              <div className='col'>
                <div className='input-group mb-3'>
                  <input
                    className='form-control'
                    ref={editInputRef}
                    type='text'
                    maxLength={80}
                    value={editTask}
                    onBlur={() => setIsEditing(null)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTask(e.target.value)}
                    onKeyDown={(e) => handleKeyDownEdit(e, task.id)}
                  />
                  <button className='btn btn-primary' onClick={() => saveTask(task.id)}>
                    Save
                  </button>
                  <button className='btn btn-warning' onClick={() => setIsEditing(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className='col'>{task.text}</div>
                <div className='col'>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      setIsEditing(task.id)
                      setEditTask(task.text)
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className='col'>
                  <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
