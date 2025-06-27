
import { RiHotelLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <main className=' flex flex-col  w-full text-center  gap-2 '>
            <RiHotelLine className='text-4xl text-center' />
            <h2 className='font-serif text-xl font-semibold '>
                Sorry ,Hotels are not found.
            </h2>
            <p className='font-serif text-lg'>Please try again.</p>
            <Link to="/" className='btn w-fit mx-auto'>Go back to home</Link>
        </main>
    )
}

export default NotFound