import PropTypes from 'prop-types'

function Header({ title }) {
   return (
      <header className='mb-8 mt-2 flex items-center justify-center'>
         <h1 className='select-none text-4xl font-medium'>{title}</h1>
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string,
}

export default Header
