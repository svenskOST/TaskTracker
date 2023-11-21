import PropTypes from 'prop-types'

function TextControl({ id, type, placeholder, value, auto, handleChange }) {
   return (
      <div className='relative mt-8 h-10 px-5'>
         <label className='border-b-2 border-black pb-1' htmlFor={id}>
            <input
               className='h-full w-full bg-transparent px-2 font-sans text-lg outline-none'
               id={id}
               name={id}
               type={type}
               placeholder={placeholder}
               value={value}
               autoComplete={auto}
               onChange={(e) => handleChange(e)}
            />
         </label>
      </div>
   )
}

TextControl.propTypes = {
   id: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   auto: PropTypes.string,
   handleChange: PropTypes.func,
}

export default TextControl
