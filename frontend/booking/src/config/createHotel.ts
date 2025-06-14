export const hotelInput = [
    'name',
    'title',
    'price',
    'address',
    'city',
    'distance',
]


export const hotelInputValidation = [
    {
        name: "name",
        placeholder: "Enter your name.",
        label: "Name",
        config: {
            required: "Name is required."
        }
    },
    {
        name: "title",
        placeholder: "Enter  title.",
        label: "Title",
        config: {
            required: "Title is required."
        }
    },
    {
        name: "price",
        placeholder: "Enter price.",
        label: "Price",
        config: {
            required: "Price is required.",
            min: { value: 1, message: "Minimum price must be 1" }
        }
    },
    {
        name: "address",
        placeholder: "Enter address.",
        label: "Address",
        config: {
            required: "Address is required."
        }
    },
    {
        name: "distance",
        placeholder: "Enter distance.",
        label: "distance",
        config: {
            required: "distance is required."
        }
    },
    {
        name: "city",
        placeholder: "Enter city.",
        label: "City",
        config: {
            required: "City is required."
        }
    },

]
export const hotelTypes = [
    "Hotel",
    "Apartment",
    "Resort",
    "Motel",

];
export const hotelFacilities = [
    "Free Breakfast",
    "Free WiFi",
    "Parking",
    "Airport Shuttle",
    "Family Rooms",
    "Non-Smoking Rooms",
    "Outdoor Pool",
    "Spa",
    "Fitness Center",
];