import Header from '../global/Header'
import Form from './Form'
import Footer from './Footer'

function Container() {
   return (
      <main className='min-h-72 m-11 w-3/4 max-w-lg rounded-md border-[3px] border-[steelblue] bg-[rgba(70,130,180,0.2)] px-16 py-8'>
         <Header title={'Registrering'} />
         <Form />
         <Footer link={'/login'} text={'Har du redan ett konto?'} />
      </main>
   )
}

export default Container
