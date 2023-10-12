/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import Button from './Button'

function Header({ title, onAdd }) {
   return (
      <header className='header'>
         <h1>{title}</h1>
         <Button color='green' text='Lägg till' onClick={onAdd} />
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string,
}

export default Header
