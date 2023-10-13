import './style/checkControl.css'
import PropTypes from 'prop-types'

function CheckControl({ id, isChecked, setCheck }) {
   return (
      <div className='checkControl'>
         <label htmlFor='reminder'>
            <span>Påminnelse</span>
            <input
               id={id}
               type='checkbox'
               checked={isChecked}
               value={isChecked}
               onChange={(e) => setCheck(e.currentTarget.checked)}
            />
         </label>
      </div>
   )
}

CheckControl.propTypes = {
   id: PropTypes.string,
   isChecked: PropTypes.bool,
   setCheck: PropTypes.func,
}

export default CheckControl
