import { useState } from 'react'
import Header from './components/header'
import Tasks from './components/Tasks'

function App() {
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

   return (
      <div className='container'>
         <Header title='Task Tracker' />
         <Tasks tasks={tasks} />
      </div>
   )
}

export default App
