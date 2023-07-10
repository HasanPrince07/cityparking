import { useContext, useEffect, useState } from "react";
import { contextapi } from "../components/Contextapi";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Profile() {

    const { gusername } = useContext(contextapi)

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [img, setImg] = useState('')

    const [change, setChange] = useState('')

    useEffect(() => {
        const formdata = { gusername }
        fetch('/user/showprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setFname(data.bRecord.fname)
                setLname(data.bRecord.lname)
                setImg(data.bRecord.img)
                setEmail(data.bRecord.email)
            } else {
                toastifywrong(data.message)
            }
        })
    }, [change,gusername])

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', img)
        formdata.append('fname', fname)
        formdata.append('lname', lname)
        formdata.append('email', email)
        formdata.append('gusername', gusername)
        fetch('/user/updateprofile', {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            },
            body: formdata
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toastify()
                setChange(change + 1)
            }
        })
    }

    function toastify() {
        toast('your profile updated', {
            position: "top-center",
            theme: 'dark',
            type: 'success'
        })
    }
    function toastifywrong(mssg) {
        toast(mssg, {
            position: "top-center",
            theme: 'dark',
            type: 'error'
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid bg-light mt-2">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-end">
                        <img src={`/upload/${img}`} style={{ width: '100px', padding: '10px 10px 10px 0px' }} alt='error'/>
                    </div>
                </div>
            </div>
            <section id="testipage">
                <h2 className="text-center roboto">Your Profile</h2>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-6">
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <div className="form-floating my-2">
                                    <input required value={fname} onChange={(e) => { setFname(e.target.value) }} type="text" className="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                    <label className='roboto' htmlFor="floatingPassword">First Name</label>
                                </div>
                                <div className="form-floating my-2">
                                    <input required value={lname} onChange={(e) => { setLname(e.target.value) }} type="text" className="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                    <label className='roboto' htmlFor="floatingPassword">Last Name</label>
                                </div>
                                <div className="form-floating my-2">
                                    <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                    <label className='roboto' htmlFor="floatingPassword">Email</label>
                                </div>
                                <label className="p-2 roboto">Profile Pic</label>
                                <input required onChange={(e) => { setImg(e.target.files[0]) }} type='file' className="form-control mt-1" />
                                <button className='form-control btn btn-dark roboto fs-4 mt-2'>Update Profile</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;