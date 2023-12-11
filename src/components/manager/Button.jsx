import PropTypes from 'prop-types'

function Button({ color, text, handleClick }) {
   return (
      <button
         className='m-1 inline-block cursor-pointer select-none rounded-md xs:px-5 px-3 xs:py-3 py-2 text-base text-white transition-transform hover:scale-110 active:scale-90'
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
