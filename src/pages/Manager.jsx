import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/manager/Container'
import { MdAccountCircle } from 'react-icons/md'

function Manager() {
   const navigate = useNavigate()

   const [showNav, setShowNav] = useState(false)

   async function handleLogout() {
      try {
         const response = await fetch(
            `http://localhost:8080/My%20Projects/Task-Tracker/api.php/logout`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
            },
         )

         if (response.ok) {
            console.log('Logout successfull')

            localStorage.clear()
            navigate('/login')
         } else {
            console.log('Logout failes')
         }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <>
         <div className='absolute flex min-h-screen w-screen items-center justify-center bg-[#eeeeee]'>
            <button
               className={`absolute left-0 top-0 mx-12 my-8 flex flex-col items-center overflow-hidden rounded-md border-2 border-[steelblue] bg-[rgba(70,130,180,0.2)] px-4 py-0 transition-[height_0.5s,_background-color_0.2s] duration-300 hover:bg-[rgba(70,130,180,0.5)] ${
                  showNav ? 'h-36 cursor-default' : ' h-[72px]'
               }`}
               onClick={() => setShowNav(!showNav)}
               onBlur={() => setShowNav(false)}
            >
               <div className='mb-4 mt-[10px] flex items-center'>
                  <MdAccountCircle className='mr-4 text-5xl' />
                  <div>
                     <h3 className='text-xl'>
                        {localStorage.getItem('username')}
                     </h3>
                  </div>
               </div>
               <div
                  className='m-1 inline-block cursor-pointer select-none rounded-md bg-black px-5 py-3 text-base text-white transition-transform hover:scale-110 active:scale-90'
                  onClick={handleLogout}
               >
                  Logga ut
               </div>
            </button>
            <Container />
         </div>
      </>
   )
}

export default Manager
