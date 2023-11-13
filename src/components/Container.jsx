import { useEffect, useState } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import Form from './Form'

function Container() {
   const [showForm, setShowForm] = useState(false)
   const [tasks, setTasks] = useState([])

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await fetch(
               'http://localhost:8080/My%20Projects/Task-Tracker/api.php',
            )
            const data = await response.json()
            setTasks(data)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData()
   }, [])

   async function addTask(task) {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
      const newTask = { id: newId, ...task }

      setTasks([...tasks, newTask])

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php?userid=1?text=${text}?date=${date}?reminder=${reminder}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
            },
         )

         if (!response.ok) {
            setTasks((prevTasks) => [
               ...prevTasks,
               { id: id, text: 'Failed adding task' },
            ])
         }
      } catch (error) {
         setTasks((prevTasks) => [
            ...prevTasks,
            { id: id, text: 'Network error while adding task' },
         ])
      }
   }

   async function removeTask(id) {
      setTasks(tasks.filter((task) => task.id !== id))

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php?id=${id}`,
            {
               method: 'DELETE',
               headers: { 'Content-Type': 'application/json' },
            },
         )

         if (!response.ok) {
            setTasks((prevTasks) => [
               ...prevTasks,
               { id: id, text: 'Task removal failed' },
            ])
         }
      } catch (error) {
         setTasks((prevTasks) => [
            ...prevTasks,
            { id: taskId, text: 'Network error during removal' },
         ])
      }
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
               onRemove={removeTask}
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
