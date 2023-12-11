import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextControl from '../global/TextControl'
import Submit from '../global/Submit'
import {
   handleChange,
   fieldValidation,
   feedback,
   clear,
} from '../../helpers/formFunctions'

function Form() {
   const navigate = useNavigate()

   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)

   async function handleSubmit(e) {
      clear(setErrorMessages, empty)
      e.preventDefault()

      if (!formData.username || !formData.password) {
         fieldValidation(
            'username',
            'Ange ditt användarnamn',
            formData,
            setErrorMessages,
         )
         fieldValidation(
            'password',
            'Ange ditt lösenord',
            formData,
            setErrorMessages,
         )

         return
      }

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task%20Tracker/api.php/login`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
            },
         )

         const data = await response.json()

         if (response.ok) {
            localStorage.setItem('userid', data.userid)
            localStorage.setItem('username', data.username)

            setFormData(empty)
            navigate('/manager')
         } else
            switch (response.status) {
               case 404:
                  feedback('username', data, setErrorMessages)
                  break
               case 401:
                  feedback('password', data, setErrorMessages)
                  break
               case 400:
                  feedback('username', data, setErrorMessages)
                  feedback('password', data, setErrorMessages)
                  break
            }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <form
         className='flex h-fit flex-col rounded-md border-2 border-black bg-[#f4f4f4] px-4'
         onSubmit={handleSubmit}
      >
         <TextControl
            id='username'
            errorMessage={errorMessages.username}
            type='text'
            placeholder='Användarnamn'
            value={formData.username}
            auto='username'
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
         />
         <TextControl
            id='password'
            errorMessage={errorMessages.password}
            type='password'
            placeholder='Lösenord'
            value={formData.password}
            auto='current-password'
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
         />
         <Submit value='Logga in' />
      </form>
   )
}

export default Form
