import { RoomType } from "../lib/types";

const RoomList = ({ rooms }: { rooms: RoomType[] }) => {


    return (
        <section className="w-full">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-2 border border-gray-300">Room Name</th>
                        <th className="p-2 border border-gray-300">Guests</th>
                        <th className="p-2 border border-gray-300">Price</th>
                        <th className="p-2 border border-gray-300">Available</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room._id} className="text-center">
                            <td className="p-2 border border-gray-300">{room.title}</td>
                            <td className="p-2 border border-gray-300">{room.maxPeople}</td>
                            <td className="p-2 border border-gray-300">${room.price}</td>
                            <td className="p-2 border border-gray-300">

                                <button className="btn">Reserve</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default RoomList;