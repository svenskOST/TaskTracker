import PropTypes from 'prop-types'

function CheckControl({
   id,
   type,
   placeholder,
   value,
   handleCheckChange,
   formData,
   setFormData,
}) {
   return (
      <div className='mt-5 flex h-10 w-full items-center justify-center px-1'>
         <span className='mr-3'>{placeholder}</span>
         <input
            className='aspect-square w-4'
            id={id}
            name={id}
            type={type}
            checked={value}
            value={value}
            onChange={(e) =>
               handleCheckChange(e.currentTarget.checked, formData, setFormData)
            }
         />
      </div>
   )
}

CheckControl.propTypes = {
   id: PropTypes.string,
   errorMessage: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.bool,
   handleCheckChange: PropTypes.func,
   formData: PropTypes.object,
   setFormData: PropTypes.func,
}

export default CheckControl
