import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function InternalMenuBar() {

    let navigateTo = useNavigate();

    let user = "";

    if (sessionStorage.getItem("user")) {
        user = JSON.parse(sessionStorage.getItem("user"))
        // console.log("Internal : ", user)
    }
    else {
        // console.log("Logout User !!")
        navigateTo("/")
    }

    // Function to call when the user clicks on the logout button
    const logoutUser = () => {
        sessionStorage.clear()
    }

    return (
        <>
            <div className="row mt-3 menuBar">
                <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 col-xxl-7 mt-2">
                    <span id='userName' className='menutextStyle'>Welcome {user.enrollNo} - {user.name.split(" ")[0]} {user.role === "faculty" ? user.gender==="female" ? "Mam" : "Sir" : ""} 👋</span>
                </div>
                <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-7 col-xl-6 col-xxl-5 text-right" >
                    <div className="row">
                        <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="/" onClick={logoutUser}>Logout</Link></div>
                        <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">Marksheets</Link></div>
                        <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">View Profile</Link></div>
                        <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">Fee Receipts</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InternalMenuBar
