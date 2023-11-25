import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='text-center mt-8 underline'>
            <Link to={'/'}>Har du inte ett konto?</Link>
        </footer>
    )
}

export default Footer