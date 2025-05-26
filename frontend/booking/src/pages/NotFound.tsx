
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <main className='text-center flex flex-col items-center w-full h-[calc(100vh-25vh)] justify-center gap-2 '>
            <h2 className='font-serif text-xl font-semibold '>
                Sorry , you try to search hotels are not found.
            </h2>
            <p className='font-serif text-lg'>Please check the search destination it is really exit.</p>
            <Link to="/" className='btn'>Go back to home</Link>
        </main>
    )
}

export default NotFound