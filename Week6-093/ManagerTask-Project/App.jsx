import { useState } from 'react'
import './App.css'

const employeeData = [
  { id: 1, name: 'Ava', workload: 1 },
  { id: 2, name: 'John', workload: 2 },
  { id: 3, name: 'Sara', workload: 1 },
]

const initialTasks = [
  { id: 1, title: 'Create landing page', assignedTo: 'Ava' },
  { id: 2, title: 'Fix login bug', assignedTo: 'John' },
  { id: 3, title: 'Prepare sales report', assignedTo: null },
]

function App() {
  const [employees, setEmployees] = useState(employeeData)
  const [tasks, setTasks] = useState(initialTasks)
  const [taskText, setTaskText] = useState('')

  const assignTaskToLeastLoadedEmployee = (taskId) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return

    const sortedEmployees = [...employees].sort((a, b) => a.workload - b.workload)
    const selectedEmployee = sortedEmployees[0]

    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === selectedEmployee.id
          ? { ...employee, workload: employee.workload + 1 }
          : employee,
      ),
    )

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === taskId ? { ...item, assignedTo: selectedEmployee.name } : item,
      ),
    )
  }

  const addTask = () => {
    if (!taskText.trim()) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title: taskText.trim(), assignedTo: null },
    ])
    setTaskText('')
  }

  const autoAssignAll = () => {
    const updatedEmployees = employees.map((employee) => ({ ...employee }))

    const updatedTasks = tasks.map((task) => {
      if (task.assignedTo) return task

      const worker = [...updatedEmployees].sort((a, b) => a.workload - b.workload)[0]
      const employeeIndex = updatedEmployees.findIndex((item) => item.id === worker.id)
      updatedEmployees[employeeIndex].workload += 1

      return { ...task, assignedTo: worker.name }
    })

    setEmployees(updatedEmployees)
    setTasks(updatedTasks)
  }

  return (
    <div className="manager-app">
      <header className="header">
        <div>
          <p className="label">TEAM FLOW</p>
          <h1>Manager task board</h1>
        </div>
      </header>

      <main className="content">
        <section className="box">
          <h2>Employees</h2>
          <div className="employee-list">
            {employees.map((employee) => (
              <div key={employee.id} className="employee-row">
                <span>{employee.name}</span>
                <strong>{employee.workload} tasks</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="box">
          <h2>Add new task</h2>
          <div className="task-form">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter task name"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <button className="secondary-btn" onClick={autoAssignAll}>Auto assign</button>
        </section>

        <section className="box">
          <h2>Task list</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-row">
                <div>
                  <p>{task.title}</p>
                  <small>{task.assignedTo ? `Assigned to: ${task.assignedTo}` : 'Waiting for assignment'}</small>
                </div>
                <button onClick={() => assignTaskToLeastLoadedEmployee(task.id)}>
                  {task.assignedTo ? 'Reassign' : 'Assign'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
