import PropTypes from 'prop-types'

function Button({ color, text, onClick }) {
   return (
      <button
         className='m-1 inline-block cursor-pointer rounded-md px-5 py-3 text-base text-white transition-transform hover:scale-110 active:scale-90'
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
