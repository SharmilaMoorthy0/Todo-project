import React, { useEffect, useState } from 'react'

import { ModalBody, ModalHeader, Modal } from "reactstrap"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import swal from 'sweetalert'
import './todo.css'
import { useNavigate } from 'react-router-dom'


function Todo() {
  const [todoList, setodoList] = useState([])
  const [createmodal, setcreatemodal] = useState(false)
  const [newtodo, setnewtodo] = useState({
    Task: "",
    isCompleted: false
  })
  const [Editmodal, setEditmodal] = useState(false)
  const [editTodo, seteditTodo] = useState({})
  const [isEdit, setisEdit] = useState(false)


  //create todo//

  const createNewtodo = () => {
    if (newtodo.Task === "") {
      toast.error("task filled cannot be empty!")
    }
    axios.post("https://todo-backend-7-bd9d.onrender.com/new/todo", newtodo, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setcreatemodal(false)
        setnewtodo({
          Task: "",
          isCompleted: false
        })
        getTodolist()
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }
  //get all todo//
  const getTodolist = () => {
    axios.get("https://todo-backend-7-bd9d.onrender.com/all/todo", {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        setodoList(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getTodolist()
  }, [])

  const Todoedit = (data) => {
    seteditTodo(data)
    setEditmodal(!Editmodal)

  }
  // edit todo//
  const updateTodo = () => {
    if (editTodo.Task === "") {
      return toast.error("task filled cannot be empty!")

    }
    axios.put(`https://todo-backend-7-bd9d.onrender.com/update/todo/${editTodo._id}`, editTodo, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setEditmodal(false)
        seteditTodo({})
        getTodolist()
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }

  //remove todo//
  const removetodo = (data) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete the Todo ?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`https://todo-backend-7-bd9d.onrender.com/remove/todo/${data.Task}`, {
          headers: {
            Authorization: localStorage.getItem("myapptoken")
          }

        }).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getTodolist()
          }
          if (res.data.status === 0) {
            toast.success(res.data.message)
          }

        }).catch((err) => { console.log(err) })
      }
      else {
        swal("your file is safe")
      }

    })

  }

  // check complete//
  const completeTask = (index, id, value) => {
    todoList[index].isCompleted = value
    setodoList([...todoList])
    let data = {
      id: id,
      isCompleted: value
    }
    axios.post("https://todo-backend-7-bd9d.onrender.com/complete/todo", data, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        toast.success("Task Updated")
        getTodolist()
      }
      if (res.data.status === 0) {
        toast.success(res.data.message)
      }


    }).catch((err) => { console.log(err) })
  }

  const navigate = useNavigate()

  const onLogout = () => {
    let token = localStorage.removeItem("myapptoken")
    navigate('/')
  }
  return (

    <>
      <div className='  bg container-fluid  '>
        <div className='container w-75 m-auto '>

          <h1 className='login-head  text-center'>Todo App</h1>


        </div>
        <div className='row '>
          <div className='border text-dark mt-5 '>
            <div className='d-flex justify-content-between align-items-center '>
              <h1 className=' mt-3 heading'>TODO LIST</h1>
              <div className='mt-3'>
                <button className='btn btn-success mx-2' onClick={() => setcreatemodal(!createmodal)}> <i class="fa fa-plus" aria-hidden="true"></i></button>
                <button className='btn btn-primary' onClick={() => onLogout()}><i class="fa fa-sign-out" aria-hidden="true"></i></button>

              </div>
            </div>

            {todoList.length > 0 && (
              todoList.map((list, i) => {
                return <div className="row">
                  <div className="col-1 p-0">
                    <div className="mb-3 mx-2 form-check">
                      <input type="checkbox"
                        className="form-check-input"
                        checked={list.isCompleted}
                        onChange={(e) => completeTask(i, list._id, e.target.checked)}

                      />
                    </div>
                  </div>

                  <div className='col-7'>
                    <div className='mb-3 mx-2'>
                      <input type='text' className='form-control' placeholder='Enter the Task'

                        value={list.Task}

                        disabled />
                    </div>
                  </div>
                  <div className='col-4'>
                    <div>

                      <button className=' btn btn-warning rounded mx-1' onClick={() => Todoedit(list)}>
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                      <button className='btn btn-danger rounded' onClick={() => removetodo(list)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>

                    </div>
                  </div>
                </div>
              })
            )}

          </div>
        </div>
      </div>
    





      <Modal isOpen={createmodal} toggle={() => setcreatemodal(!createmodal)}>
        <ModalHeader toggle={() => setcreatemodal(!createmodal)}>Create Todo</ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='mb-3'>
              <input type='text' className='form-control' placeholder='enter the task'

                onChange={(e) => setnewtodo({ ...newtodo, Task: e.target.value })} />
            </div>
            <div>
              <button className='btn btn-sm btn-outline-success' onClick={() => createNewtodo()}>create</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={Editmodal} size='md' toggle={() => setEditmodal(!Editmodal)}>
        <ModalHeader toggle={() => setEditmodal(!Editmodal)}>Edit Todo</ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='mb-3'>
              <input type='text' className='form-control' placeholder='enter the task'
                value={editTodo?.Task}

                onChange={(e) => seteditTodo({ ...editTodo, Task: e.target.value })}
              />
            </div>
            <div>
              <button className='btn btn-sm btn-outline-success' onClick={() => updateTodo()}>update</button>

            </div>
          </div>
        </ModalBody>
      </Modal>

    </>


  )
}


export default Todo