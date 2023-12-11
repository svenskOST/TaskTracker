import { useState } from 'react'
import PropTypes from 'prop-types'
import TextControl from '../global/TextControl'
import CheckControl from './CheckControl'
import Submit from './Submit'
import {
   handleChange,
   handleCheckChange,
   fieldValidation,
   feedback,
   clear,
} from '../../helpers/formFunctions'

function Form({ showForm, userid, fetchData }) {
   const empty = {
      task: '',
      date: '2023-12-31T23:59',
      reminder: false,
   }

   const emptyErrors = {
      task: '',
      date: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(emptyErrors)

   function allFieldsError(data) {
      feedback('task', data, setErrorMessages)
      feedback('date', data, setErrorMessages)
   }

   async function handleSubmit(e) {
      clear(setErrorMessages, emptyErrors)
      e.preventDefault()

      if (!formData.task || !formData.date) {
         fieldValidation(
            'task',
            'Ange en aktivitet',
            formData,
            setErrorMessages,
         )
         fieldValidation('date', 'Ange ett datum', formData, setErrorMessages)

         return
      }

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task%20Tracker/api.php/addTask/?userid=${userid}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            },
         )

         const data = await response.json()

         if (response.ok) {
            setFormData(empty)
            fetchData()
         } else
            switch (response.status) {
               case 500:
                  allFieldsError(data)
                  break
               case 400:
                  allFieldsError(data)
                  break
            }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <div
         className={`mx-0 xs:mx-4 flex flex-col overflow-hidden transition-[height,_margin-top] duration-500 ${
            showForm ? 'mt-8 h-[300px]' : 'mt-0 h-0'
         }`}
      >
         <div className='overflow-hidden rounded-md border-2 border-black bg-[#f4f4f4] px-5 xs:px-8 sm:px-10'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
               <TextControl
                  id='task'
                  errorMessage={errorMessages.task}
                  type='text'
                  placeholder='Aktivitet'
                  value={formData.task}
                  auto='on'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='date'
                  errorMessage={errorMessages.date}
                  type='datetime-local'
                  value={formData.date}
                  auto='off'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />

               <CheckControl
                  id='reminder'
                  type='checkbox'
                  placeholder='Påminnelse'
                  value={formData.reminder}
                  handleCheckChange={handleCheckChange}
                  formData={formData}
                  setFormData={setFormData}
               />

               <Submit value='Spara' />
            </form>
         </div>
      </div>
   )
}

Form.propTypes = {
   userid: PropTypes.string,
   showForm: PropTypes.bool,
   fetchData: PropTypes.func,
}

export default Form
