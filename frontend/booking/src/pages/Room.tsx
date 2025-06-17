
import { useParams } from 'react-router-dom'
import RoomForm from '../components/RoomForm'

const Room = () => {
    const { hotelId } = useParams()

    return (
        <div className='py-12'>
            <RoomForm hotelId={hotelId!} />
        </div>
    )
}

export default Room