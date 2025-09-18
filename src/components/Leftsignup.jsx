import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Leftsignup = () => {
    const API_URL = import.meta.env.VITE_SERVER_URL

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const handelOnSubmit = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append("firstName", firstName)
            formData.append("lastName", lastName)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("gender", gender)
            formData.append("image", file)

            const res = await axios.post(`${API_URL}/user/signup`,
                formData
                , { withCredentials: true })

            if (res.data.message === "User Created Successfully") return navigate("/")
            navigate('/signup')


        } catch (error) {
            console.log('Signup error :' + error.message);

        }
    }



    return (
        <div className='w-[50%] h-full '>
            <p className='text-[#0866ff] text-7xl py-15 font-bold'>
                Beyond words, true connections
            </p>
            <p className='text-[18px] text-zinc-700 pt'>Welcome! Join us to connect, share, and have conversations that truly matter.</p>

            <form onSubmit={handelOnSubmit} className="flex flex-col gap-4 w-full max-w-sm" encType='multipart/form-data' >
                <input
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="Enter your first name"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />

                <input
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Enter your last name"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />


                <div className="flex items-center gap-6">
                    <span>Gender:</span>
                    <label className="flex items-center pl-10 gap-2 cursor-pointer">
                        <input onChange={e => setGender(e.target.value)} type="radio" name="gender" value="male" className="w-4 h-4 text-blue-600 rounded focus:ring-0 focus:outline-none" />
                        <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input onChange={e => setGender(e.target.value)} type="radio" name="gender" value="female" className="w-4 h-4 text-blue-600 rounded focus:ring-0 focus:outline-none" />
                        <span className="text-gray-700">Female</span>
                    </label>
                </div>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="file-upload"
                        className="text-sm font-medium text-gray-700"
                    >
                        Upload Profile Image
                    </label>
                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-500 transition"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-500">
                            {file ? file.name : "No file selected"}
                        </span>
                        <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                </div>




                <div className='mt-4  flex justify-between items-center w-full'>
                    <button type='submit' className='py-2 px-6 w-fit rounded-full bg-blue-700 text-white font-bold hover:cursor-pointer hover:bg-blue-600'>SIGNUP</button>
                    <a href="/login" className='hover:cursor-pointer underline text-[12px] text-zinc-700'>Already Have an account?</a>
                </div>
            </form>




        </div>
    )
}

export default Leftsignup
