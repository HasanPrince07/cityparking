import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contextapi } from '../components/Contextapi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Userlogin() {
    const { setGusername } = useContext(contextapi)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleform(e) {
        e.preventDefault()
        const formdata = { username, password }
        fetch('/user/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                if (data.bRecord.username === 'admin') {
                    navigate('/userlogin')
                } else {
                    window.localStorage.setItem('username', data.bRecord.username)
                    setGusername(window.localStorage.getItem('username'))
                    window.localStorage.setItem('token', JSON.stringify(data.auth))
                    navigate('/')
                }
            } else if (data.status === 400) {
                toastify('Wrong Credentials')
            } else if (data.message === 'wrong') {
                toastify('Something went wrong,Please try again after sometime')
            }
            else {
                toastify(data.message)
            }
        })
    }
    function toastify(mssg) {
        toast(mssg, {
            position: "top-center",
            theme: 'dark',
            type: 'error'
        })
    }

    return (
        <>
            <ToastContainer />
            <section id="signup">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12 d-flex justify-content-center align-items-center' style={{ backgroundImage: `url('images/parking2.jpeg')` }}>
                            <div className="col-md-6 bg-white rounded-1">
                                <h2 className="text-center roboto fw-bold py-5">User Login</h2>
                                <div className='mx-5'>
                                    <form method='post' onSubmit={(e) => { handleform(e) }}>
                                        <div className="form-floating my-2">
                                            <input required value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                            <label className='roboto' htmlFor="floatingPassword">Username</label>
                                        </div>
                                        <div className="form-floating my-2">
                                            <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="text" className="form-control" id="floatingPassword" placeholder="Enter you Password" />
                                            <label className='roboto' htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <button className='form-control btn btn-dark roboto fs-4 mt-2'>Login</button>
                                    </form>
                                    <p className='text-center text-dark my-5'>Don't Have Account ? <Link to='/usersignup' className='text-warning text-decoration-none'><span>Signup</span></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Userlogin;