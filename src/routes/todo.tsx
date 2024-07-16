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
      <div className='input-group mb-3'>
        <input
          className='form-control'
          type='text'
          maxLength={80}
          value={newTask}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDownAdd}
          placeholder='Add new task'
        />
        <button onClick={addTask} className='btn btn-outline-secondary'>
          Add
        </button>
      </div>
      <ul className='list-group'>
        {tasks.map((task) => (
          <li key={task.id} className='list-group-item d-flex justify-content-between align-items-center'>
            {isEditing === task.id ? (
              <>
                <div className='input-group mb-3'>
                  <input
                    className='form-control'
                    ref={editInputRef}
                    type='text'
                    maxLength={80}
                    value={editTask}
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
              </>
            ) : (
              <>
                {task.text}
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setIsEditing(task.id)
                    setEditTask(task.text)
                  }}
                >
                  Edit
                </button>
                <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
