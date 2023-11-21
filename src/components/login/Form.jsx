import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextControl from './TextControl'
import Submit from './Submit'

function Form() {
   const navigate = useNavigate()

   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)

   function handleChange(e) {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   async function handleSubmit(e) {
      e.preventDefault()

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
            type='text'
            placeholder='Användarnamn'
            value={formData.username}
            auto='username'
            handleChange={handleChange}
         />
         <TextControl
            id='password'
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
