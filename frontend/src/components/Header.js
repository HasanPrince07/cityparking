import { useContext } from "react";
import { Link } from "react-router-dom";
import { contextapi } from "./Contextapi";

function Header() {
    const { gusername, setGusername } = useContext(contextapi)

    function handlelogout(e) {
        window.localStorage.removeItem('username')
        setGusername(window.localStorage.getItem('username'))
        window.localStorage.removeItem('token')
    }

    return (
        <>
            <section id="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container-fluid px-5">
                        <div className="d-flex align-items-center">
                            <Link className="text-decoration-none fw-bolder roboto"><h2>Cityparking</h2></Link>
                        </div>
                        {gusername ?
                            <div className="text-white fs-3 roboto">welcome {gusername}</div>
                            : ''}
                        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                            <ul className="navbar-nav">
                                {gusername ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder roboto" to='/profile' >Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder roboto" to='/' >Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder roboto" to='/userlogin' onClick={(e) => { handlelogout(e) }}>Logout</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder roboto" to='/adminlogin'>Admin</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder roboto" to='/userlogin'>User</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    );
}


export default Header;