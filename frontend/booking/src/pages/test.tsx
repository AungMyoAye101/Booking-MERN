import { useState } from "react"


const Test = () => {
    const [image, setImage] = useState<File | null>()
    console.log(image)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!image) return
        const formData = new FormData()
        formData.append("photo", image)
        try {
            const res = await fetch("http://localhost:5000/post", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message)
            }
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="bg-white border p-12 w-96  mx-auto mt-20 flex flex-col gap-4" encType="multipart/form-data">
            <input type="text" className="bg-green-400 " />
            <input
                type="file"
                name="file"
                className="w-30 h-40 bg-blue-100"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                    } else {
                        setImage(null);
                    }
                }}
            />
            <button type="submit">POST</button>
        </form>
    )
}

export default Test