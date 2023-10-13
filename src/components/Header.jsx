import './style/header.css'
import Button from './Button'
import PropTypes from 'prop-types'

function Header({ title, onAdd, showForm }) {
   return (
      <header className='header'>
         <h1>{title}</h1>
         <Button
            color={`${!showForm ? 'green' : 'red'}`}
            text={`${!showForm ? 'Lägg till' : 'Avbryt'}`}
            onClick={onAdd}
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
