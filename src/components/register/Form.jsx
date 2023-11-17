import TextControl from './TextControl'
import Submit from './Submit'

function Form() {
   return (
      <form className='flex h-fit flex-col rounded-md border-2 border-black bg-[#f4f4f4] px-4'>
         <TextControl id='username' type='text' placeholder='Användarnamn' />
         <TextControl id='email' type='email' placeholder='Mailadress' />
         <TextControl id='password' type='password' placeholder='Lösenord' />
         <Submit value='Skapa konto' />
      </form>
   )
}

export default Form
