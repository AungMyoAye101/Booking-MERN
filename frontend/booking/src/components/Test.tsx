import React, { FormEvent, useState } from 'react'
import { base_url } from '../lib/helper'

const Test = () => {
    const [files, setFiles] = useState<File | null>(null)
    console.log(files)
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!files) return
        const formData = new FormData()
        formData.append("photos", files)
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
    return (
        <div className='py-10 bg-green-300'>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <input type="file" onChange={(e) => setFiles(e.target.files?.[0] || null)} />
                <button type='submit'>Upload</button>
            </form>

        </div>
    )
}

export default Test