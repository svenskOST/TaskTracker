import { useState } from 'react'
import { Link } from 'react-router-dom'
import TextControl from '../global/TextControl'
import Submit from '../global/Submit'
import {
   handleChange,
   fieldValidation,
   feedback,
   clear,
} from '../../helpers/formFunctions'

function Form() {
   const empty = {
      username: '',
      email: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)
   const [registrationComplete, setRegistrationComplete] = useState(false)

   function allFieldsError(data) {
      feedback('username', data, setErrorMessages)
      feedback('email', data, setErrorMessages)
      feedback('password', data, setErrorMessages)
   }

   async function handleSubmit(e) {
      clear(setErrorMessages, empty)
      e.preventDefault()

      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation(
            'username',
            'Ange ett användarnamn',
            formData,
            setErrorMessages,
         )
         fieldValidation(
            'email',
            'Ange din mailadress',
            formData,
            setErrorMessages,
         )
         fieldValidation(
            'password',
            'Ange ett lösenord',
            formData,
            setErrorMessages,
         )

         return
      }

      try {
         const response = await fetch(
            `https://elevsidor.kreativlink.se/aw/arskurs-3/task-tracker/api/api.php/register`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            },
         )

         const data = await response.json()

         if (response.ok) {
            setFormData(empty)
            setRegistrationComplete(true)
         } else
            switch (response.status) {
               case 409:
                  feedback('username', data, setErrorMessages)
                  break
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
      <>
         {registrationComplete ? (
            <div className='flex h-fit flex-col rounded-md border-2 border-black bg-[#f4f4f4] px-4 text-center'>
               <h2 className='mt-12 text-xl'>Ditt konto har registrerats!</h2>
               <Link
                  to={'/login'}
                  className='mx-20 my-12 rounded-md bg-black px-5 py-3 text-base text-white transition-transform hover:scale-105 active:scale-90'
               >
                  Logga in
               </Link>
            </div>
         ) : (
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
                  id='email'
                  errorMessage={errorMessages.email}
                  type='email'
                  placeholder='Mailadress'
                  value={formData.email}
                  auto='email'
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
                  auto='new-password'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <Submit value='Skapa konto' />
            </form>
         )}
      </>
   )
}

export default Form
