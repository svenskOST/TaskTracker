import Header from '../global/Header'
import Form from './Form'
import Footer from '../global/Footer'

function Container() {
   return (
      <main className='min-h-72 w-[95%] max-w-lg rounded-md border-[3px] border-[steelblue] bg-[rgba(70,130,180,0.2)] px-6 py-8 xs:px-16'>
         <Header title={'Inloggning'} />
         <Form />
         <Footer link={'/'} text={'Har du inte ett konto?'} />
      </main>
   )
}

export default Container
