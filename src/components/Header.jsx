import Button from './Button'
import PropTypes from 'prop-types'

function Header({ title, onToggle, showForm }) {
   return (
      <header className='mb-5 flex items-center justify-between px-3'>
         <h1 className='text-4xl font-medium select-none'>{title}</h1>
         <Button
            color={`${!showForm ? 'green' : 'red'}`}
            text={`${!showForm ? 'Lägg till' : 'Avbryt'}`}
            onClick={onToggle}
         />
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string,
   onAdd: PropTypes.func,
   showForm: PropTypes.bool,
}

export default Header
