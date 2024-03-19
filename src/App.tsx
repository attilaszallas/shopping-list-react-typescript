import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITask {
  name: string;
  done: boolean
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTask(value)
    setValue('')
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const completeTask = (index: number): void => {
    const newTasks: ITask[] = tasks.slice()
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  const removeTask = (index: number):void =>{
    const newTasks: ITask[] = tasks.slice()
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Shopping List</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} required />
        <button type='submit'>Add Task</button>
      </form>
      {tasks.map((task: ITask, index: number) => (
        <div key={index}>
          <h3 style={{ textDecoration: task.done ? 'line-through' : '' }}>{task.name}</h3>
          <button onClick={() => completeTask(index)}>{task.done ? 'Undo' : 'Done' }</button>
          <button onClick={() => removeTask(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default App;
