import React from 'react'
import { Link } from 'react-router-dom'

function WebLinks() {
    return (
        <div className="row menuBar">
            <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 col-xxl-7 mt-2">
                <span id='userName' className='menutextStyle'>Welcome 20012021053👋</span>
            </div>
            <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-7 col-xl-6 col-xxl-5 text-right" >
                <div className="row">
                    <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="/">Logout</Link></div>
                    <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">Marksheets</Link></div>
                    <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">View Profile</Link></div>
                    <div className="col-md-12 col-lg-3 menutextStyle mt-2"><Link to="">Fee Receipts</Link></div>
                </div>
            </div>
        </div>
    )
}

export default WebLinks
