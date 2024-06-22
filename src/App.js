
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login'

import { Toaster } from 'react-hot-toast';
import Todo from './components/Todo';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const toastoption={
  // Define default options
  className: '',
  duration: 5000,
  style: {
    background: '#363636',
    color: '#fff',
  },

  // Default options for specific types
  success: {
    duration: 3000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
  },

}



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
       
        <Route path='/forgot/password' element={<ForgotPassword />} />
        <Route path='/verify/otp' element={<VerifyOtp />} />
        <Route path='/reset/password' element={<ResetPassword />} />
        <Route path='/todo' element={<Todo />} />
       
        
      </Routes>
      <Toaster position='top-center' toastOptions={toastoption} />
    </BrowserRouter>

  )
}

export default App;
