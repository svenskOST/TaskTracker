import PropTypes from 'prop-types'
import './style/textControl.css'

function TextControl({ id, placeholder, value, setVal }) {
   return (
      <div className='textControl'>
         <label htmlFor={id}>
            <input
               id={id}
               type='text'
               placeholder={placeholder}
               value={value}
               onChange={(e) => setVal(e.target.value)}
            />
            <span>{placeholder}</span>
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
