import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Footer({ link, text }) {
   return (
      <footer className='mt-8 text-center underline'>
         <Link to={link}>{text}</Link>
      </footer>
   )
}

Footer.propTypes = {
   link: PropTypes.string,
   text: PropTypes.string,
}

export default Footer
