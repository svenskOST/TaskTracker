import { useState } from 'react'
import PropTypes from 'prop-types'
import Submit from './Submit'
import TextControl from './TextControl'
import CheckControl from './CheckControl'

function Form({ showForm, onAdd }) {
   const [text, setText] = useState('')
   const [date, setDate] = useState('')
   const [reminder, setReminder] = useState(false)

   function onSubmit(e) {
      e.preventDefault()

      if (!text) {
         alert('Var vänlig ange aktivitet')
         return
      }

      onAdd({ text, date, reminder })

      setText('')
      setDate('')
      setReminder(false)
   }

   return (
      <div
         className={`flex flex-col overflow-hidden transition-[height,_padding-bottom] duration-500 ${
            showForm ? 'h-[300px] pb-10' : 'h-0 pb-0'
         }`}
      >
         <form
            className='overflow-hidden rounded-md border-2 border-black bg-[#f4f4f4] px-4'
            onSubmit={onSubmit}
         >
            <div className='flex flex-col'>
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
                  isChecked={reminder}
                  setCheck={setReminder}
               />

               <Submit value='Spara' />
            </div>
         </form>
      </div>
   )
}

Form.propTypes = {
   showForm: PropTypes.bool,
   onAdd: PropTypes.func,
}

export default Form
