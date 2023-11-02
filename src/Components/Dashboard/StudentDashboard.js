import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../../CSS/Dashboard.css"
import materialImg from "../../Images/materials.png"
import timetableImg from "../../Images/timetable.png"
import attendanceImg from "../../Images/contact1.png"
import remainderImg from "../../Images/remainder.png"
import facultyContactImg from "../../Images/contacts.png"
import recentAccessImg from "../../Images/recentaccessed.png"
import NoteContext from '../../Context/NoteContext'
import InternalMenuBar from '../InternalMenuBar'
import NavBreadcrumb from '../NavBreadcrumb'

function StudentDashboard() {

    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    // Using the Context API
    const contextData = useContext(NoteContext);

    if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token") || !sessionStorage.getItem("role") === "student") {

        sessionStorage.clear()
        navigateTo("/");

        // Showing the Alert Box
        contextData.showAlert("Failed", "Error Fetching the Account Details", "alert-danger")

    }

    // Function to move the user to materials page
    const openMaterials = () => {
        console.log("This is a material Pages")
        navigateTo(`${location.pathname}/materials`)
    }

    // Function to move the user to materials page
    const openAttendance = () => {
        console.log("This is a Attendance Pages")
        navigateTo(`${location.pathname}/attendance`)
    }

    // Function to move the user to remainders page
    const openRemainders = () => {
        console.log("This is a Remainders Pages")
        navigateTo(`${location.pathname}/remainders`)
    }

    // Function to move the user to materials page
    const openFacultyInfo = () => {
        console.log("This is a Faculty Info Pages")
        navigateTo(`${location.pathname}/facultyinfo`)
    }

    // Adding the code that will run when the user will first open the page
    useEffect(() => {

        // Checking for the session storage items
        if (!sessionStorage.getItem("token") && !sessionStorage.getItem("role") === "student") {

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
                            <div className="card itemCard" onClick={openMaterials}>
                                <img src={materialImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Materials</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openAttendance}>
                                <img src={attendanceImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Attendance</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openRemainders}>
                                <img src={remainderImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Remainders</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openFacultyInfo}>
                                <img src={facultyContactImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Faculty Contacts</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard">
                                <img src={timetableImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName" >Timetable</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
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
