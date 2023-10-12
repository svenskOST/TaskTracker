/* eslint-disable react/prop-types */
import { useState } from 'react'

function AddTask({ onAdd }) {
   const [text, setText] = useState('')
   const [day, setDay] = useState('')
   const [reminder, setReminder] = useState(false)

   function onSubmit(e) {
      e.preventDefault()

      if(!text){
        alert('Var vänlig ange aktivitet')
        return
      }

      onAdd({ text, day, reminder })

      setText('')
      setDay('')
      setReminder(false)
   }

   return (
      <form className='add-form' onSubmit={onSubmit}>
         <div className='form-control'>
            <label>Aktivitet</label>
            <input
               type='text'
               placeholder='Ange aktivitet'
               value={text}
               onChange={(e) => setText(e.target.value)}
            />
         </div>
         <div className='form-control'>
            <label>Dag & tid</label>
            <input
               type='text'
               placeholder='Ange dag & tid'
               value={day}
               onChange={(e) => setDay(e.target.value)}
            />
         </div>
         <div className='form-control form-control-check'>
            <label>Påminnelse</label>
            <input
               type='checkbox'
               checked={reminder}
               value={reminder}
               onChange={(e) => setReminder(e.currentTarget.checked)}
            />
         </div>

         <input className='btn btn-block' type='submit' value='Spara' />
      </form>
   )
}

export default AddTask
