import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <section id="home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(images/parking1.jpeg)` }}>
                            <div className="col-md-2">
                                <Link className="btn btn-light form-control roboto fs-4 px-2" to='/addentry'>Add New Entry</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;