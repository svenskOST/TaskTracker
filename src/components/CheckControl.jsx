import PropTypes from 'prop-types'

function CheckControl({ id, isChecked, setCheck }) {
   return (
      <div className='mt-5 flex h-10 w-full items-center justify-center px-1'>
         <label
            className='-mt-2 flex h-full items-center justify-between'
            htmlFor='reminder'
         >
            <span className='mr-3'>Påminnelse</span>
            <input
               className='aspect-square w-4'
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
