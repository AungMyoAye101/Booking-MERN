const RoomList = () => {
    const rooms = [
        { name: "Single", guests: 1, price: 100, available: true },
        { name: "Double", guests: 2, price: 150, available: false },
        { name: "Suite", guests: 4, price: 300, available: true },
    ];

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
                    {rooms.map((room, index) => (
                        <tr key={index} className="text-center">
                            <td className="p-2 border border-gray-300">{room.name}</td>
                            <td className="p-2 border border-gray-300">{room.guests}</td>
                            <td className="p-2 border border-gray-300">${room.price}</td>
                            <td className="p-2 border border-gray-300">
                                <button
                                    className={`px-4 py-1 rounded ${room.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                        }`}
                                >
                                    {room.available ? "Yes" : "No"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default RoomList;