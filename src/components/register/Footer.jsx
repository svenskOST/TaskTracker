import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='text-center mt-8 underline'>
            <Link to={'/login'}>Har du redan ett konto?</Link>
        </footer>
    )
}

export default Footer