import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextControl from '../global/TextControl'
import Submit from './Submit'

function Form() {
   const navigate = useNavigate()

   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)

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

      if (!formData.username || !formData.password) {
         fieldValidation('username', 'Ange ditt användarnamn')
         fieldValidation('password', 'Ange ditt lösenord')
         
         return
      }

      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php/login`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
            },
         )

         if (response.ok) {
            console.log('Login successfull')

            const data = await response.json()
            localStorage.setItem('userid', data.userid)
            localStorage.setItem('username', data.username)
            
            setFormData(empty)
            navigate('/manager')
         } else {
            console.error('Login failed')
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
         />
         <TextControl
            id='password'
            errorMessage={errorMessages.password}
            type='password'
            placeholder='Lösenord'
            value={formData.password}
            auto='current-password'
            handleChange={handleChange}
         />
         <Submit value='Logga in' />
      </form>
   )
}

export default Form
