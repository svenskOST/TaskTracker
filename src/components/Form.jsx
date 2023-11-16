import { useEffect, useState } from 'react'
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
      <form
         className={`overflow-hidden rounded-md border-black bg-[#f4f4f4] px-4 ${
            showForm ? 'mb-10 h-[260px] border-2' : 'mb-0 h-0 border-0'
         }`}
         style={{
            transition: showForm
               ? 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1), margin-bottom 1s cubic-bezier(0.4, 0, 0.2, 1), border-width 0s'
               : 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1), margin-bottom 1s cubic-bezier(0.4, 0, 0.2, 1), border-width 0s 0.5s',
         }}
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
   )
}

Form.propTypes = {
   showForm: PropTypes.bool,
   onAdd: PropTypes.func,
}

export default Form
