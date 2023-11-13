import { useState } from 'react'
import PropTypes from 'prop-types'
import Submit from './Submit'
import TextControl from './TextControl'
import CheckControl from './CheckControl'

function Form({ onAdd }) {
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
         className='mb-10 flex flex-col rounded-md border-2 border-black bg-[#f4f4f4] px-4'
         onSubmit={onSubmit}
      >
         <TextControl
            id='task'
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
      </form>
   )
}

Form.propTypes = {
   onAdd: PropTypes.func,
}

export default Form
