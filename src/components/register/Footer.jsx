import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='text-center mt-8 underline'>
            <Link to={'/login'}>Har du redan ett konto?</Link>
        </div>
    )
}

export default Footer