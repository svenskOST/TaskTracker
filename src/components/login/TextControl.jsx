import PropTypes from 'prop-types'

function TextControl({ id, type, placeholder, value, setVal }) {
   return (
      <div className='relative mt-8 h-10 px-5'>
         <label className='border-b-2 border-black pb-1' htmlFor={id}>
            <input
               className='h-full w-full bg-transparent px-2 font-sans text-lg outline-none'
               id={id}
               type={type}
               placeholder={placeholder}
               value={value}
               onChange={(e) => setVal(e.target.value)}
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
   setVal: PropTypes.func,
}

export default TextControl
