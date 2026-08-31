import { useState } from 'react'
import './App.css'

const initialActivities = [
  { id: 1, time: '7:00 AM', task: 'Wake up and get ready for school' },
  { id: 2, time: '8:00 AM', task: 'Have breakfast and pack school bag' },
  { id: 3, time: '9:00 AM', task: 'Attend classes and study' },
  { id: 4, time: '12:30 PM', task: 'Lunch break and rest' },
  { id: 5, time: '2:00 PM', task: 'Homework and reading time' },
  { id: 6, time: '5:00 PM', task: 'Play, exercise, and relax' },
  { id: 7, time: '7:00 PM', task: 'Dinner with family' },
  { id: 8, time: '8:30 PM', task: 'Prepare for the next day' },
]

function App() {
  const [activities, setActivities] = useState(initialActivities)
  const [time, setTime] = useState('')
  const [task, setTask] = useState('')

  const handleAddActivity = (event) => {
    event.preventDefault()

    if (!time || !task.trim()) {
      return
    }

    const newActivity = {
      id: Date.now(),
      time,
      task: task.trim(),
    }

    setActivities((prevActivities) => [...prevActivities, newActivity])
    setTime('')
    setTask('')
  }

  const handleDeleteActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id),
    )
  }

  return (
    <main className="student-page">
      <div className="student-card">
        <p className="badge">Student Daily Routine</p>
        <h1>Daily Activities</h1>

        <form className="activity-form" onSubmit={handleAddActivity}>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
            aria-label="Activity time"
          />
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter activity"
            aria-label="Activity name"
          />
          <button type="submit">Add</button>
        </form>

        <ul className="activity-list">
          {activities.map((item) => (
            <li className="activity-item" key={item.id}>
              <span className="time">{item.time}</span>
              <span className="task">{item.task}</span>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteActivity(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App
