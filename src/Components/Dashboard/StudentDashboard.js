import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../../CSS/Dashboard.css"
import materialImg from "../../Images/materials.png"
import timetableImg from "../../Images/timetable.png"
import attendanceImg from "../../Images/contact1.png"
import remainderImg from "../../Images/remainder.png"
import facultyContactImg from "../../Images/contacts.png"
import recentAccessImg from "../../Images/recentaccessed.png"
import NoteContext from '../../Context/NoteContext'
import InternalMenuBar from '../InternalMenuBar'

function StudentDashboard() {

    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    // Using the Context API
    const contextData = useContext(NoteContext);

    if (!localStorage.getItem("user") || !localStorage.getItem("token") || !localStorage.getItem("role") === "student") {

        localStorage.clear()
        navigateTo("/");

        // Showing the Alert Box
        contextData.showAlert("Failed", "Your Account Has NOT been Fetched Successfully", "alert-danger")

    }


    // Function to move the user to materials page
    const openMaterials = () => {
        console.log("This is a material Pages")

        navigateTo(`${location.pathname}/materials`)

    }

    // Adding the code that will run when the user will first open the page
    useEffect(() => {

        if (!localStorage.getItem("token") && !localStorage.getItem("role") === "student") {
            localStorage.clear()
            navigateTo("/")
        }
    }, [])

    return (
        <>

            {/* Adding the internal Menu Bar */}
            <InternalMenuBar enroll={"20012021053"} />

            {/* Ading all the other Operations */}
            <div className="my-4">
                <hr className='hrStyle' />
            </div>

            <div className="row allOperations my-5 text-white">
                <div className="container">
                    <div className="row gy-5 px-2">
                        <div className="col-4">
                            <div className="card itemCard" onClick={openMaterials}>
                                <img src={materialImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Materials</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card itemCard">
                                <img src={attendanceImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Attendance</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card itemCard">
                                <img src={remainderImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Remainders</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card itemCard">
                                <img src={facultyContactImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Faculty Contacts</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card itemCard">
                                <img src={timetableImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Timetable</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card itemCard">
                                <img src={recentAccessImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Recently Accessed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default StudentDashboard
