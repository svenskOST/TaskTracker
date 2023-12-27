import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/manager/Container'
import { MdAccountCircle } from 'react-icons/md'

function Manager() {
   const containerRef = useRef(null)

   const navigate = useNavigate()

   const [showNav, setShowNav] = useState(false)
   const [showForm, setShowForm] = useState(false)

   function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
         if (showForm) {
            setShowForm(false)
         }
      }
   }

   async function handleLogout() {
      try {
         const response = await fetch(
            `http://localhost:8080/projects/Task%20Tracker/api.php/logout`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
            },
         )

         if (response.ok) {
            localStorage.clear()
            navigate('/login')
         } else {
            console.error(response)
         }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <>
         <div
            className='absolute flex min-h-screen w-screen min-w-[340px] flex-col bg-[#eeeeee]'
            onClick={handleClick}
         >
            <section className='h-fit xl:h-32 w-screen'>
               <button
                  className={`sm:mx-12 mx-[2.5%] my-8 flex flex-col items-center overflow-hidden rounded-md border-2 border-[steelblue] bg-[rgba(70,130,180,0.2)] px-4 py-0 transition-[height_0.5s,_background-color_0.2s] duration-300 ${
                     showNav
                        ? 'h-36 cursor-default hover:bg-[rgba(70,130,180,0.2)]'
                        : 'h-[72px] hover:bg-[rgba(70,130,180,0.5)]'
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
            </section>
            <section className='flex w-screen flex-1 items-center justify-center'>
               <Container
                  showForm={showForm}
                  setShowForm={setShowForm}
                  ref={containerRef}
               />
            </section>
         </div>
      </>
   )
}

export default Manager
