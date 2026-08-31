import { useState } from 'react'
import './App.css'

const initialTools = [
  { name: 'GitHub', used: true },
  { name: 'VS Code', used: true },
  { name: 'Jira', used: true },
  { name: 'Docker', used: false },
  { name: 'Postman', used: true },
]

const initialSchedule = [
  { id: 1, time: '9:00 AM', task: 'Planning', resource: 'Team meeting', status: 'Ready' },
  { id: 2, time: '10:30 AM', task: 'Coding', resource: 'Developer', status: 'In Progress' },
  { id: 3, time: '1:00 PM', task: 'Testing', resource: 'QA team', status: 'Pending' },
  { id: 4, time: '3:00 PM', task: 'Deployment', resource: 'Server', status: 'Scheduled' },
]

function App() {
  const [tools, setTools] = useState(initialTools)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [taskForm, setTaskForm] = useState({ time: '', task: '', resource: '' })

  const activeTools = tools.filter((tool) => tool.used).length

  const toggleTool = (toolName) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.name === toolName ? { ...tool, used: !tool.used } : tool,
      ),
    )
  }

  const nextStatus = (status) => {
    const order = ['Ready', 'In Progress', 'Pending', 'Scheduled']
    const currentIndex = order.indexOf(status)
    return order[(currentIndex + 1) % order.length]
  }

  const updateSchedule = (id) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus(item.status) } : item,
      ),
    )
  }

  const addTask = (e) => {
    e.preventDefault()

    if (!taskForm.task || !taskForm.time || !taskForm.resource) {
      return
    }

    const newTask = {
      id: Date.now(),
      time: taskForm.time,
      task: taskForm.task,
      resource: taskForm.resource,
      status: 'Ready',
    }

    setSchedule((prev) => [...prev, newTask])
    setTaskForm({ time: '', task: '', resource: '' })
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <p className="label">Project dashboard</p>
          <h1>Software Development Tools</h1>
        </div>
        <div className="badge">{activeTools} tools active</div>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Tool status</h2>
          <ul className="tool-list">
            {tools.map((tool) => (
              <li key={tool.name}>
                <span>{tool.name}</span>
                <button
                  className={tool.used ? 'active' : 'inactive'}
                  onClick={() => toggleTool(tool.name)}
                >
                  {tool.used ? 'On' : 'Off'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card highlight">
          <h2>Resource Summary</h2>
          <p>Developers: 5</p>
          <p>QA testers: 2</p>
          <p>Servers: 3</p>
        </div>
      </section>

      <section className="card schedule-box">
        <h2>Resource Allocation Through Scheduling</h2>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Task name"
            value={taskForm.task}
            onChange={(e) => setTaskForm({ ...taskForm, task: e.target.value })}
          />
          <input
            type="text"
            placeholder="Time"
            value={taskForm.time}
            onChange={(e) => setTaskForm({ ...taskForm, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Resource"
            value={taskForm.resource}
            onChange={(e) => setTaskForm({ ...taskForm, resource: e.target.value })}
          />
          <button type="submit" className="add-btn">Add Task</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Resource</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.id}>
                <td>{item.time}</td>
                <td>{item.task}</td>
                <td>{item.resource}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="small-btn" onClick={() => updateSchedule(item.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
