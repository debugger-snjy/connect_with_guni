import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

function InternalMenuBar() {

    let user = JSON.parse(localStorage.getItem("user"))
    console.log("Internal : ",user)

    // Function to call when the user clicks on the logout button
    const logoutUser = () => {
        localStorage.clear()
    }

    return (
        <div className="row mt-3 menuBar">
            <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 col-xxl-7 mt-2">
                <span id='userName' className='menutextStyle'>Welcome {user.enrollNo}👋</span>
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
    )
}

export default InternalMenuBar
