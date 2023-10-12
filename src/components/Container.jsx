import './style/container.css'
import { useState } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'

function Container() {
   const [showForm, setShowForm] = useState(false)
   const [tasks, setTasks] = useState([
      {
         id: 1,
         text: 'Visa utkast av dummy sida för Martin',
         day: '12:e Okt vid 13:30',
         reminder: true,
      },
      {
         id: 2,
         text: 'Göra klart affärsplanen',
         day: '20:e Okt vid 23:59',
         reminder: true,
      },
      {
         id: 3,
         text: 'Maya födelsedag',
         day: '28:e Okt',
         reminder: true,
      },
   ])

   function addTask(task) {
      const id = Math.floor(Math.random() * 10000) + 1
      const newTask = { id, ...task }
      setTasks([...tasks, newTask])
   }

   function deleteTask(id) {
      setTasks(tasks.filter((task) => task.id !== id))
   }

   function toggleReminder(id) {
      setTasks(
         tasks.map((task) =>
            task.id === id ? { ...task, reminder: !task.reminder } : task,
         ),
      )
   }

   return (
      <div className='container'>
         <Header onAdd={() => setShowForm(!showForm)} title='Att göra' showForm={showForm} />
         {showForm && <AddTask onAdd={addTask} />}
         {tasks.length > 0 ? (
            <Tasks
               tasks={tasks}
               onDelete={deleteTask}
               onToggle={toggleReminder}
            />
         ) : (
            <p style={{ textAlign: 'center', marginTop: '70px' }}>
               Hurra! Inget att göra...
            </p>
         )}
      </div>
   )
}

export default Container
