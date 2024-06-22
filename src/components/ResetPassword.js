
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'


function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const [reset, setreset] = useState({
        Email: location?.state?.Email || '',
        NewPassword: "",
        ConfirmPassword: ""
    })
    const resetPaasword = () => {
        if (reset.NewPassword === "") {
            return toast.error("newpassword required")
        }
        if (reset.ConfirmPassword === "") {
            return toast.error("confirm password requried")
        }
        if (reset.NewPassword !== reset.ConfirmPassword) {
            return toast.error("password doesn't match")
        }

        axios.post("http://localhost:8000/reset/password", reset).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                navigate('/')
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
                        <h3 class=" text-center mt-3 fw-medium fs-5">Reset Password</h3>

                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <h6 className='fw-bold text-white'>OTP send to your Email - <span className='text-warning'>{location?.state?.Email}</span></h6>
                                <input type="password"
                                    class="form-control w-75 m-auto"
                                    name="NewPassword"
                                    placeholder='NewPassword'
                                    // value={login.Email}
                                    onChange={(e) => setreset({ ...reset, NewPassword: e.target.value })}
                                />

                            </div>
                        </div>
                        <div className='col'>
                            <div class="mb-3 mt-3">

                                <input type="password"
                                    class="form-control w-75 m-auto"
                                    name="ConfirmPassword"
                                    placeholder='Confirm Password'
                                    onChange={(e) => setreset({ ...reset, ConfirmPassword: e.target.value })} 

                               />

                            </div>
                        </div>
                        <div class="d-grid mb-2">
                                <button class="  btn1 " onClick={() => resetPaasword()} type="submit">Reset</button>
                        </div>
                            




                    </div>
                </div>
            </div>


        </body >


    )
}

export default ResetPassword