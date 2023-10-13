import PropTypes from 'prop-types'
import './style/submit.css'

function Submit({ value }) {
   return <input className='btn submit' type='submit' value={value} />
}

Submit.propTypes = {
   value: PropTypes.string,
}

export default Submit
