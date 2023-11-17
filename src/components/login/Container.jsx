import Header from './Header'
import Form from './Form'
import Footer from './Footer'

function Container() {
   return (
      <div className='min-h-72 m-11 w-3/4 max-w-lg rounded-md border-[3px] border-[steelblue] bg-[rgba(70,130,180,0.2)] py-8 px-16'>
         <Header title={'Inloggning'} />
         <Form />
         <Footer />
      </div>
   )
}

export default Container
