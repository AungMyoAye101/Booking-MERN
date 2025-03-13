import { useState } from "react";

const TestImage = () => {
    const [image, setImage] = useState<any>(null);
    const [base64, setBase64] = useState<any>(null);

    const handleImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setBase64(reader.result);
            }
        }
    }
    console.log(base64);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submit');
        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ image: base64 }),
            });

            if (!res.ok) {
                throw new Error("Failed to upload image");
            }
            console.log("image uploaded successfully");

            const data = await res.json();
            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }
    return <div className="min-h-screen flex justify-center items-center">
        <div className="w-96 h-96 bg-gray-200 flex flex-col justify-center items-center">
            <form onSubmit={onSubmit}>
                <input type="file" accept="image/*" placeholder="image" onChange={handleImage} />
                <button type="submit" className="btn">Post</button>
            </form>
        </div>
    </div>
};

export default TestImage;