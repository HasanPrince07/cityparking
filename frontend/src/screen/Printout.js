import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Printout() {

    const { id } = useParams()
    const [oname, setOname] = useState('')
    const [vnumber, setVnumber] = useState('')
    const [vtype, setVtype] = useState('')
    const [charge, setCharge] = useState('')

    useEffect(() => {
        fetch(`/admin/showadminprintout/${id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setOname(data.bRecord.oname)
                setVnumber(data.bRecord.vnumber)
                setVtype(data.bRecord.vtype)
                setCharge(data.bRecord.charge)
            } else {
                toastifywrong(data.message)
            }
        })
        setTimeout(handleprint, 1000)
        function handleprint() {
            window.print()
        }
    }, [id])

    function toastifywrong(mssg) {
        toast(mssg, {
            type: 'error',
            position: 'top-center',
            theme: 'dark'
        })
    }

    return (
        <>
            <ToastContainer />
            <section id="printout">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered fs-5">
                                <tbody>
                                    <tr>
                                        <th>Owner Name</th>
                                        <td>{oname}</td>
                                    </tr>
                                    <tr>
                                        <th>Vehicle Number</th>
                                        <td>{vnumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Vehicle Type</th>
                                        <td>{vtype}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Charge</th>
                                        <td>{charge} Rs.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Printout;