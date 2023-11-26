import Button from './Button'
import PropTypes from 'prop-types'

function Header({ title, onToggle, showForm }) {
   return (
      <header className='mb-5 flex items-center justify-between '>
         <h1 className='select-none text-4xl font-medium'>{title}</h1>
         <Button
            color={`${!showForm ? 'green' : 'red'}`}
            text={`${!showForm ? 'Lägg till' : 'Avbryt'}`}
            handleClick={onToggle}
         />
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string,
   onToggle: PropTypes.func,
   showForm: PropTypes.bool,
}

export default Header
