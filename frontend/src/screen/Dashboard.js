import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Dashboard() {
    const [entryrecords, setEntryrecords] = useState([])
    const [change, setChange] = useState('')

    useEffect(() => {
        fetch('/admin/showadminentry', {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setEntryrecords(data.bRecord)
            } else {
                toastifywrong(data.message)
            }
        })
    }, [change])

    function handlestatus(e, id) {
        fetch(`/admin/updatestatus/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setChange(change + 1)
            } else {
                toastifywrong(data.message)
            }
        })
    }

    function handledelete(e, id) {
        fetch(`/admin/deleteentry/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setChange(change + 1)
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

    return (
        <>
            <ToastContainer />
            {entryrecords.length !== 0 ?
                <section id='dashboard' className='d-flex align-items-center'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 table-responsive'>
                                <table className="table table-bordered text-center align-middle roboto">
                                    <thead>
                                        <tr className="align-middle table-dark">
                                            <th>S.No.</th>
                                            <th>Owner Name</th>
                                            <th>Vehicle Number</th>
                                            <th>Vehicle Type</th>
                                            <th>Entry Time</th>
                                            <th>Exit Time</th>
                                            <th>Total Time</th>
                                            <th>Charge</th>
                                            <th>Status</th>
                                            <th>Delete</th>
                                            <th>Print Out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entryrecords.map((result, key) => (
                                            <tr key={result._id}>
                                                <td>{key + 1}</td>
                                                <td>{result.oname}</td>
                                                <td>{result.vnumber}</td>
                                                <td>{result.vtype}</td>
                                                <td>{result.endate}</td>
                                                <td>{result.exdate}</td>
                                                <td>{result.ttime} Hours</td>
                                                <td>{result.charge}</td>
                                                {result.status === 'in' ?
                                                    <td><button onClick={(e) => { handlestatus(e, result._id) }} className='btn btn-dark'>{result.status}</button></td>
                                                    :
                                                    <td><button disabled className='btn btn-dark'>{result.status}</button></td>
                                                }
                                                <td><button onClick={(e) => { handledelete(e, result._id) }} className='btn btn-dark form-control'>Delete</button></td>
                                                <td><Link to={`/printout/${result._id}`} className='btn btn-dark form-control'>Print Out</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div style={{ height: '717px' }} className='container d-flex align-items-center justify-content-center'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2 className='roboto'>Entries are empty</h2>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Dashboard;