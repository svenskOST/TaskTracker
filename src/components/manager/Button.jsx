import PropTypes from 'prop-types'

function Button({ color, text, handleClick }) {
   return (
      <button
         className='m-1 select-none inline-block cursor-pointer rounded-md px-5 py-3 text-base text-white transition-transform hover:scale-110 active:scale-90'
         style={{ backgroundColor: color }}
         onClick={handleClick}
      >
         {text}
      </button>
   )
}

Button.propTypes = {
   color: PropTypes.string,
   text: PropTypes.string,
   handleClick: PropTypes.func,
}

export default Button
