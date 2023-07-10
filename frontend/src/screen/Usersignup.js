import { useState } from 'react';
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Usersignup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { username, password }
        fetch('/user/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toastifyright(data.bRecord.username)
            } else if (data.message === 'already') {
                toastifywrong(`${data.bRecord.username} is already exists`)
            } else {
                toastifywrong(data.message)
            }
        })
    }
    function toastifywrong(mssg) {
        toast(mssg, {
            position: "top-center",
            theme: 'dark',
            type: 'error'
        })
    }
    function toastifyright(username) {
        toast(`${username} is registered`, {
            position: "top-center",
            theme: 'dark',
            type: 'success'
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
                                <h2 className="text-center roboto fw-bold py-5">User Signup</h2>
                                <div className='mx-5'>
                                    <form method='post' onSubmit={(e) => { handleform(e) }}>
                                        <div class="form-floating my-2">
                                            <input required value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" class="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                            <label className='roboto' for="floatingPassword">Username</label>
                                        </div>
                                        <div class="form-floating my-2">
                                            <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="text" class="form-control" id="floatingPassword" placeholder="Enter you Password" />
                                            <label className='roboto' for="floatingPassword">Password</label>
                                        </div>
                                        <button className='form-control btn btn-dark roboto fs-4 mt-2'>Signup</button>
                                    </form>
                                    <p className='text-center text-dark my-5'>Have An Account ? <Link to='/userlogin' className='text-warning text-decoration-none'><span>Login</span></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Usersignup;