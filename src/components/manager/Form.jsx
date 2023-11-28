import { useState } from 'react'
import PropTypes from 'prop-types'
import Submit from './Submit'
import TextControl from './TextControl'
import CheckControl from './CheckControl'

function Form({ showForm, onAdd }) {
   const [text, setText] = useState('')
   const [date, setDate] = useState('')
   const [localReminder, setLocalReminder] = useState(false)

   function onSubmit(e) {
      e.preventDefault()

      if (!text) {
         alert('Var vänlig ange aktivitet')
         return
      }

      var reminder

      if (localReminder) {
         reminder = 1
      } else {
         reminder = 0
      }

      onAdd({ text, date, reminder })

      setText('')
      setDate('')
      setLocalReminder(false)
   }

   return (
      <div
         className={`mx-4 flex flex-col overflow-hidden transition-[height,_margin-top] duration-500 ${
            showForm
               ? 'mt-8 h-[300px]'
               : 'mt-0 h-0'
         }`}
      >
         <div className='overflow-hidden rounded-md border-2 border-black bg-[#f4f4f4] px-10'>
            <form className='flex flex-col' onSubmit={onSubmit}>
               <TextControl
                  id='text'
                  placeholder='Aktivitet'
                  value={text}
                  setVal={setText}
               />
               <TextControl
                  id='date'
                  placeholder='Datum'
                  value={date}
                  setVal={setDate}
               />

               <CheckControl
                  id='reminder'
                  isChecked={localReminder}
                  setCheck={setLocalReminder}
               />

               <Submit value='Spara' />
            </form>
         </div>
      </div>
   )
}

Form.propTypes = {
   showForm: PropTypes.bool,
   onAdd: PropTypes.func,
}

export default Form
