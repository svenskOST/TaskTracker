import PropTypes from 'prop-types'

function TextControl({
   id,
   errorMessage,
   type,
   placeholder,
   value,
   auto,
   handleChange,
}) {
   return (
      <div className='relative mt-8 h-10 px-5'>
         <label className='left-5 -top-4 absolute text-sm text-red-500' htmlFor={id}>
            {errorMessage}
         </label>
         <input
            className='h-full w-full border-b-2 border-black bg-transparent px-2 pb-1 font-sans text-lg outline-none'
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            autoComplete={auto}
            onChange={(e) => handleChange(e)}
         />
      </div>
   )
}

TextControl.propTypes = {
   id: PropTypes.string,
   errorMessage: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   auto: PropTypes.string,
   handleChange: PropTypes.func,
}

export default TextControl
