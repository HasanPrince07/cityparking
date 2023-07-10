import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Addentry() {
    const [oname, setOname] = useState('')
    const [vnumber, setVnumber] = useState('')
    const [vtype, setVtype] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { oname, vnumber, vtype }
        fetch('/user/addentry', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toastify()
            } else {
                toastifywrong(data.message)
            }
        })
    }
    function toastify() {
        toast('Entry is done', {
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
            <section id="home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12" style={{ backgroundImage: `url(images/parking1.jpeg)` }}>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-md-6 rounded-1">
                                    <h2 className="text-center roboto fw-bold py-5">Add New Entry Here</h2>
                                    <div className='mx-5'>
                                        <form method='post' onSubmit={(e) => { handleform(e) }}>
                                            <div className="form-floating my-2">
                                                <input value={oname} onChange={(e) => { setOname(e.target.value) }} required type="text" className="form-control" id="floatingPassword" placeholder="Enter you Username" />
                                                <label className='roboto' htmlFor="floatingPassword">Owner Name</label>
                                            </div>
                                            <div className="form-floating my-2">
                                                <input value={vnumber} onChange={(e) => { setVnumber(e.target.value) }} required type="text" className="form-control" id="floatingPassword" placeholder="Enter you Password" />
                                                <label className='roboto' htmlFor="floatingPassword">Vehicle Number</label>
                                            </div>
                                            <select required className="form-select" value={vtype} onChange={(e) => { setVtype(e.target.value) }}>
                                                <option value=''>select wheeler</option>
                                                <option value='2w'>2 wheeler</option>
                                                <option value='3w'>3 wheeler</option>
                                                <option value='4w'>4 wheeler</option>
                                                <option value='hw'>heavy wheeler</option>
                                                <option value='other'>other</option>
                                            </select>
                                            <button className='form-control btn btn-dark roboto fs-4 mt-2 mb-4'>Add Entry</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Addentry;