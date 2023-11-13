import PropTypes from 'prop-types'
import './style/submit.css'

function Submit({ value }) {
   return (
      <input
         className='m-1 mb-5 inline-block cursor-pointer rounded-md bg-black px-5 py-3 text-base text-white transition-transform hover:scale-105 active:scale-90'
         type='submit'
         value={value}
      />
   )
}

Submit.propTypes = {
   value: PropTypes.string,
}

export default Submit
