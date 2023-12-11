import PropTypes from 'prop-types'

function TextControl({
   id,
   errorMessage,
   type,
   placeholder,
   value,
   auto,
   handleChange,
   formData,
   setFormData,
}) {
   return (
      <div className='relative mt-8 h-10 xs:px-5 px-3'>
         <label
            className='absolute -top-2 xs:-top-4 left-5 animate-bounce text-xs xs:text-sm text-red-500'
            htmlFor={id}
         >
            {errorMessage}
         </label>
         <input
            className='text-md h-full w-full border-b-2 border-black bg-transparent px-2 pb-0 font-sans outline-none xs:pb-1 xs:text-lg'
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            autoComplete={auto}
            onChange={(e) => handleChange(e, formData, setFormData)}
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
   formData: PropTypes.object,
   setFormData: PropTypes.func,
}

export default TextControl
