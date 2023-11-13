import { useState } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import Form from './Form'

function Container() {
   const [showForm, setShowForm] = useState(false)
   const [tasks, setTasks] = useState([
      {
         id: 1,
         text: 'Visa utkast av dummy sida för Martin',
         date: '12:e Okt vid 13:30',
         reminder: true,
      },
      {
         id: 2,
         text: 'Göra klart affärsplanen',
         date: '20:e Okt vid 23:59',
         reminder: true,
      },
      {
         id: 3,
         text: 'Maya födelsedag',
         date: '28:e Okt',
         reminder: false,
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
      <div className='min-h-72 m-11 w-3/4 max-w-screen-sm rounded-md border-[3px] border-[steelblue] bg-[rgba(70,130,180,0.2)] p-8'>
         <Header
            onAdd={() => setShowForm(!showForm)}
            title='Att göra'
            showForm={showForm}
         />
         {showForm && <Form onAdd={addTask} />}
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
