import { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Tasks from './Tasks'
import Form from './Form'

const Container = forwardRef(function Container(props, ref) {
   
   const [tasks, setTasks] = useState([])

   const userid = localStorage.getItem('userid')

   useEffect(() => {
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   async function fetchData() {
      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php?userid=${userid}`,
         )
         
         var data = await response.json()

         data = binaryToBool(data)

         setTasks(data)
      } catch (error) {
         console.error('Error:', error)
      }
   }

   async function toggleReminder(id, reminder) {
      setTasks(
         tasks.map((task) =>
            task.id === id ? { ...task, reminder: !reminder } : task,
         ),
      )

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php?id=${id}&reminder=${!reminder}`,
            {
               method: 'PATCH',
               headers: { 'Content-Type': 'application/json' },
            },
         )

         if (!response.ok) {
            setTasks((prevTasks) => [
               ...prevTasks,
               { id: id, text: 'Failed toggling reminder' },
            ])
         }
      } catch (error) {
         setTasks((prevTasks) => [
            ...prevTasks,
            { id: id, text: 'Network error while toggling reminder' },
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
            { id: id, text: 'Network error during removal' },
         ])
      }
   }

   function binaryToBool(data) {
      for (let i = 0; i < data.length; i++) {
         if (data[i].reminder == 0) {
            data[i].reminder = false
         } else {
            data[i].reminder = true
         }
      }

      return data
   }

   return (
      <main
         className='min-h-72 m-11 w-3/4 max-w-screen-sm rounded-md border-[3px] border-[steelblue] bg-[rgba(70,130,180,0.2)] px-16 py-8'
         ref={ref}
      >
         <Header
            onToggle={() => props.setShowForm(!props.showForm)}
            title='Att göra'
            showForm={props.showForm}
         />
         <Form showForm={props.showForm} userid={userid} fetchData={fetchData} />
         {tasks.length > 0 ? (
            <Tasks
               tasks={tasks}
               onRemove={removeTask}
               onToggle={toggleReminder}
            />
         ) : (
            <p className='my-10 text-center'>Hurra! Inget att göra...</p>
         )}
      </main>
   )
})

Container.propTypes = {
   containerRef: PropTypes.object,
   showForm: PropTypes.bool,
   setShowForm: PropTypes.func,
}

export default Container
