import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function VerifyOtp() {
    const navigate = useNavigate()
    const location = useLocation()
    const [otp, setOtp] = useState('')
    const verifyOtp = () => {
        if (otp === "") {
            return toast.error("OTP requried")
        }
        if (otp.length < 4) {
            return toast.error("invalid OTP")
        }
        axios.post("https://todo-backend-7-bd9d.onrender.com/verify/otp", { Email: location?.state?.Email, otp: otp }).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                navigate('/reset/password', { state: { Email: location?.state?.Email } })
            }

            if (res.data.status === 0) {
                toast.error(res.data.message)
            }
            if (res.data.status === 2) {
                toast.error(res.data.message)
                navigate('/forgot/password')
            }

        }).catch((err) => { console.log(err) })
    }
    return (
     
      <body className='container-fluid bg'>
            <div className='container '>
                <h1 className='login-head  text-center'>Todo App</h1>
                <div className='row '>
                    <div className='login-border  mt-5'>
                        <h3 class=" text-center mt-3 fw-medium fs-5">Verify Otp</h3>
                        <div className='col'>
                            <div class="mb-3 mt-3">
                            <h6 className='fw-bold text-white'>OTP send to your Email - <span className='text-warning'>{location?.state?.Email}</span></h6>
                                <input type="email"
                                    class="form-control w-75 m-auto"
                                    name="otp"
                                    placeholder='otp'
                                    // value={login.Email}
                                    onChange={(e) => setOtp(e.target.value)} />

                            </div>
                        </div>
                       
                            <div class="d-grid mb-2">
                                <button class="  btn1 " onClick={() => verifyOtp()} type="submit">verify</button>
                            </div>
                            

                        </div>
                    </div>
                </div>
            

        </body >
                              












    )
}

export default VerifyOtp