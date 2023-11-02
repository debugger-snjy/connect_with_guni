import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../../Context/NoteContext';
import InternalMenuBar from '../InternalMenuBar';
import NavBreadcrumb from '../NavBreadcrumb';

function AttendanceOperations() {
    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    // Using the Context API
    const contextData = useContext(NoteContext);

    if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token") || !sessionStorage.getItem("role") === "admin") {

        sessionStorage.clear()
        navigateTo("/");

        // Showing the Alert Box
        contextData.showAlert("Failed", "Error Fetching the Account Details", "alert-danger")

    }

    // Adding the code that will run when the user will first open the page
    useEffect(() => {

        // Checking for the session storage items
        if (!sessionStorage.getItem("token") && !sessionStorage.getItem("role") === "admin") {

            // If not present then clear the session storage and move to the home page
            sessionStorage.clear()
            navigateTo("/")
        }

    }, [])

    return (
        <>

            {/* Adding the internal Menu Bar */}
            <InternalMenuBar />

            {/* Ading all the other Operations */}
            <div className="my-4">
                <hr className='hrStyle' />
            </div>

            <NavBreadcrumb />

            <div className="row allOperations mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-4 px-2">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard">
                                <img src={"..."} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Upload Attendance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AttendanceOperations
