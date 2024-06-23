import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const [showpassword, setshowpassword] = useState()
    const [login, setlogin] = useState({
        Email: "",
        password: ""
    })
    const handleChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    const OnLogin = () => {
        if (login.Email === "") {
            return toast.error("Email required")
        }
        if (login.password === "") {
            return toast.error("password requried")
        }
        axios.post("https://todo-backend-7-bd9d.onrender.com/login/user", login).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                console.log(res.data.token)
              
                localStorage.setItem("myapptoken", res.data.token)
                setlogin({
                    Email: "",
                    password: ""
                   })
                navigate('/todo')
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
                        <h3 class=" text-center mt-3 fw-medium fs-5">LogIn</h3>
                        <div className='col'>
                            <div class="mb-3 mt-3">

                                <input type="email"
                                    class="form-control w-75 m-auto"
                                    name="Email"
                                    placeholder='Email'
                                    value={login.Email}
                                    onChange={(e) => handleChange(e)} />

                            </div>
                        </div>
                        <div className='col'>

                            <div class="mt-3 mb-3">
                                <input type='password'
                                    class="form-control w-75 m-auto"
                                    name="password"
                                    placeholder='Password'
                                    value={login.password}
                                    onChange={(e) => handleChange(e)} />
                               
                            </div>
                            <div class="d-grid mb-2">
                                <button class="  btn1 " onClick={() => OnLogin()} type="submit">Login</button>
                            </div>
                            <div className=' '>
                               
                               
                                < button class="d-block  mt-2  btn1" onClick={() => navigate('/signup')} href="#">Signup</button>
                                <a class="d-block text-danger btn2 fw-bold mt-2 small text-decoration-none " onClick={() => navigate('/forgot/password')} href="#">------Forgot Password-----</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </body >
    )
}


export default Login


