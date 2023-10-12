import './style/button.css'
import PropTypes from 'prop-types'

function Button({ color, text, onClick }) {
   return (
      <button
         className='btn'
         style={{ backgroundColor: color }}
         onClick={onClick}
      >
         {text}
      </button>
   )
}

Button.propTypes = {
   color: PropTypes.string,
   text: PropTypes.string,
   onClick: PropTypes.func,
}

export default Button
