import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'



function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')


    const sendOtp = () => {
        if (email === "") {
            return toast.error("Email requried")
        }
        axios.post("https://todo-backend-7-bd9d.onrender.com//forgot/password", { Email: email }).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                navigate('/verify/otp', { state: { Email: email } })
                setEmail('')
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)
            }
        }).catch((err) => { console.log(err) })
    }
    return (
        <body className='container-fluid bg'>
            <div className='container '>
                <h1 className='login-head  text-center'>Todo App</h1>
                <div className='row '>
                    <div className='login-border  mt-5'>
                        <h3 class=" text-center mt-3 fw-medium fs-5">Forgot Password</h3>
                        <div className='col'>
                            <div class="mb-3 mt-3">

                                <input type="email"
                                    class="form-control w-75 m-auto"
                                    name="Email"
                                    placeholder='Email'
                                    value={email.Email}
                                    onChange={(e) => setEmail(e.target.value)} />

                            </div>
                        </div>

                        <div class="d-grid mb-2">
                            <button class="  btn1 " onClick={() => sendOtp()} type="submit">Send OTP</button>
                        </div>
                        

                    </div>
                </div>
            </div>
       

    </body >

    )
}




export default ForgotPassword