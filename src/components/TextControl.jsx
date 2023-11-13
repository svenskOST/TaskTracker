import PropTypes from 'prop-types'

function TextControl({ id, placeholder, value, setVal }) {
   return (
      <div className='relative mt-5 h-10 px-1'>
         <label className='border-b-2 border-black pb-1' htmlFor={id}>
            <input
               className='h-full w-full rounded-md bg-transparent px-2 font-sans text-lg outline-none'
               id={id}
               type='text'
               placeholder={placeholder}
               value={value}
               onChange={(e) => setVal(e.target.value)}
            />
            <span className='absolute bottom-0 left-0 text-lg'>
               {placeholder}
            </span>
         </label>
      </div>
   )
}

TextControl.propTypes = {
   id: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   setVal: PropTypes.func,
}

export default TextControl
