import { useState } from 'react'
import { Link } from 'react-router-dom'
import TextControl from '../global/TextControl'
import Submit from './Submit'

function Form() {
   const empty = {
      username: '',
      email: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)
   const [registrationComplete, setRegistrationComplete] = useState(false)

   function handleChange(e) {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   function fieldValidation(field, message) {
      if (!formData[field]) {
         setErrorMessages((prevErrorMessages) => ({
            ...prevErrorMessages,
            [field]: message,
         }))
      } else {
         setErrorMessages((prevErrorMessages) => ({
            ...prevErrorMessages,
            [field]: '',
         }))
      }
   }

   async function handleSubmit(e) {
      e.preventDefault()

      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation('username', 'Ange ett användarnamn')
         fieldValidation('email', 'Ange din mailadress')
         fieldValidation('password', 'Ange ett lösenord')
         
         return
      }

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php/register`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            },
         )

         if (response.ok) {
            console.log('Registration successfull')
            setFormData(empty)
            setRegistrationComplete(true)
         } else {
            console.error('Registration failed')
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
               />
               <TextControl
                  id='email'
                  errorMessage={errorMessages.email}
                  type='email'
                  placeholder='Mailadress'
                  value={formData.email}
                  auto='email'
                  handleChange={handleChange}
               />
               <TextControl
                  id='password'
                  errorMessage={errorMessages.password}
                  type='password'
                  placeholder='Lösenord'
                  value={formData.password}
                  auto='new-password'
                  handleChange={handleChange}
               />
               <Submit value='Skapa konto' />
            </form>
         )}
      </>
   )
}

export default Form
