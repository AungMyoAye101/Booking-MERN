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
            required: "Name is required.",
            minLength: { value: 3, message: "Name must be at least 3 character." }
        }
    },
    {
        name: "title",
        placeholder: "Enter  title.",
        label: "Title",
        config: {
            required: "Title is required.",
            minLength: { value: 3, message: "Title must be at least 3 characters." }

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
            required: "Address is required.",
            minLength: { value: 1, message: "Address must be at least 1 character." }
        }
    },
    {
        name: "distance",
        placeholder: "Enter distance.",
        label: "distance",
        config: {
            required: "distance is required.",
            minLength: { value: 3, message: "Distance at least 3 characters." }
        }
    },
    {
        name: "city",
        placeholder: "Enter city.",
        label: "City",
        config: {
            required: "City is required.",
            minLength: { value: 1, message: "City must be at least 1 character." }
        }
    },

]
export const hotelTypes = [
    "Hotel",
    "Apartment",
    "Resort",
    "Motel",

];
export const hotelAmenities = [
    {
        value: "Free Breakfast",
        label: 'freebreakfast'
    },
    {
        value: "Free WiFi",
        label: "FreeWiFi",
    },
    {
        value: "Parking",
        label: "Parking",
    },
    {
        value: "Airport Shuttle",
        label: "Airport-Shuttle",
    },
    {
        value: "Family Rooms",
        label: "Family-Rooms",
    },
    {
        value: "Non-Smoking Rooms",
        label: "Non-Smoking-Rooms",
    },
    {
        value: "Outdoor Pool",
        label: "Outdoor-Pool"
    },
    {
        value: "Spa",
        label: "Spa",
    }, {
        value: "Fitness Center",
        label: "Fitness-Center",
    }







];