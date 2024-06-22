
import './signup.css'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function Signup() {
    const navigate = useNavigate()

    const [user, setuser] = useState({
        username: "",
        Email: "",
        password: "",
        mobile: ""
    }
    )
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const validateEmail = (Email) => {
        let result = /^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/;
        return result.test(Email)
    }

    const onsubmit = () => {
        // e.preventDefault()
        if (user.username === "") {
            return toast.error("username requried")
        }
        if (user.Email === "") {
            return toast.error("Email requried")
        }
        if (!validateEmail(user.Email)) {
            return toast.error("invalid email")
        }
        if (user.password === "") {
            return toast.error(" password requried")
        }

        if (user.mobile === "") {
            return toast.error("mobile requried")
        }
        if (user.mobile.length < 9) {
            return toast.error("must contain 10 digits")
        }

        axios.post("http://localhost:8000/user/signup", user).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                setuser({
                    username: "",
                    Email: "",
                    password: "",
                    mobile: ""
                })
                navigate('/')
            }

            if (res.data.status === 0) {
                toast.error(res.data.message)
            }

        }).catch((err) => { console.log(err) })

    }
    return (

        <body className='"container-fluid bg'>
            <div class="container">
                <h1 className='login-head  text-center'>Todo App</h1>
                <div class="row ">
                    <div class='login-border  mt-5'>
                        <h3 class=" text-center mt-3 fw-medium fs-5">SignIn</h3>
                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <input type="text" class="form-control w-75 m-auto"
                                    name="username"
                                    placeholder='Name'
                                    value={user.username}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <input type="email" class="form-control w-75 m-auto"
                                    name="Email"
                                    placeholder='Email'
                                    value={user.Email}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <input type="password" class="form-control w-75 m-auto"
                                    name="password"
                                    placeholder='password'
                                    value={user.password}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className='col'>
                            <div class="mb-3 mt-3">
                                <input type="number" class="form-control w-75 m-auto"
                                    name="mobile"
                                    placeholder='0'
                                    value={user.mobile}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div class="d-grid mb-2">
                                <button class=" btn1 text-white text-uppercase" onClick={() => onsubmit()} type="submit">Register</button>
                            </div>







                        </div>
                    </div>


                </div>
            </div>
        


        </body >


    )
}
export default Signup




