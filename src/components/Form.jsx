import './style/addTask.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

function AddTask({ onAdd }) {
   const [text, setText] = useState('')
   const [day, setDay] = useState('')
   const [reminder, setReminder] = useState(false)

   function onSubmit(e) {
      e.preventDefault()

      if (!text) {
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
            <label htmlFor='task'>
               <input
                  id='task'
                  type='text'
                  placeholder='Aktivitet'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
               <span>Aktivitet</span>
            </label>
         </div>
         <div className='form-control'>
            <label htmlFor='date'>
               <input
                  id='date'
                  type='text'
                  placeholder='Dag & tid'
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
               />
               <span>Dag & tid</span>
            </label>
         </div>
         <div className='form-control-check'>
            <label htmlFor='reminder'>
               <span>Påminnelse</span>
               <input
                  id='reminder'
                  type='checkbox'
                  checked={reminder}
                  value={reminder}
                  onChange={(e) => setReminder(e.currentTarget.checked)}
               />
            </label>
         </div>

         <input className='btn btn-submit' type='submit' value='Spara' />
      </form>
   )
}

AddTask.propTypes = {
   onAdd: PropTypes.func,
}

export default AddTask
