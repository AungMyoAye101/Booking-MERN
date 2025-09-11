import React, { FormEvent, useState } from 'react'
import { base_url } from '../lib/helper'

const Test = () => {
    const [files, setFiles] = useState<File[]>([])
    console.log(files)
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!files) return
        const formData = new FormData()
        files.forEach(img => formData.append("photos", img))

        console.log(formData)
        try {
            const res = await fetch(base_url + "/api/hotel/test/upload", {
                method: "POST",
                body: formData

            });
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {

            const photos = Array.from(files)
            setFiles((pre) => ([...pre, ...photos]))
        }
    }
    return (
        <div className='py-10 bg-green-300'>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <input type="file" multiple onChange={handlePhotoChange} />
                <button type='submit'>Upload</button>
            </form>

        </div>
    )
}

export default Test