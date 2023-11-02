import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../../CSS/Dashboard.css"

import adminImg from "../../Images/admin_admin.png"
import studentImg from "../../Images/admin_students.png"
import facultyImg from "../../Images/admin_faculty.png"
import materialImg from "../../Images/admin_material.png"
import uploadMaterialImg from "../../Images/admin_upload_material.png"
import attendanceImg from "../../Images/admin_attendance.png"
import subjectImg from "../../Images/admin_subjects.png"
import feesImg from "../../Images/admin_fees.png"
import timetableImg from "../../Images/admin_timetable.png"
import marksheetImg from "../../Images/admin_marksheet01.png"

import NoteContext from '../../Context/NoteContext'
import InternalMenuBar from '../InternalMenuBar'
import NavBreadcrumb from '../NavBreadcrumb'

function AdminDashboard() {

    const openAdminOperations = () => {
        console.log("This is a Admin Operations");
        navigateTo(`${location.pathname}/admin_operations`)
    }

    const openStudentOperations = () => {
        console.log("This is a Student Operations");
        navigateTo(`${location.pathname}/student_operations`)
    }

    const openFacultyOperations = () => {
        console.log("This is a Faculty Operations");
        navigateTo(`${location.pathname}/faculty_operations`)
    }

    const openUploadMaterials = () => {
        console.log("This is a Upload Materials");
        navigateTo(`${location.pathname}/materials_operations`)
    }

    const openUploadAttendance = () => {
        console.log("This is a Upload Attendance");
        navigateTo(`${location.pathname}/attendance_operations`)
    }

    const openSubjectOperations = () => {
        console.log("This is a Subject Operations");
        navigateTo(`${location.pathname}/subject_operations`)
    }

    const openTimetableOperations = () => {
        console.log("This is a Timetable Operations");
        navigateTo(`${location.pathname}/timetable_operations`)
    }

    const openFeesOperations = () => {
        console.log("This is a Fees Operations");
        navigateTo(`${location.pathname}/fees_operations`)
    }

    const openMarksheetOperations = () => {
        console.log("This is a Marksheet Operations");
        navigateTo(`${location.pathname}/marksheet_operations`)
    }
    
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
                            <div className="card itemCard" onClick={openAdminOperations}>
                                <img src={adminImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Admin Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openStudentOperations}>
                                <img src={studentImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Student Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openFacultyOperations}>
                                <img src={facultyImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Faculty Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openUploadMaterials}>
                                <img src={uploadMaterialImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Upload Materials</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openUploadAttendance}>
                                <img src={attendanceImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Upload Attendance</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openSubjectOperations}>
                                <img src={subjectImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Subject Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openTimetableOperations}>
                                <img src={timetableImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Timetable Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openFeesOperations}>
                                <img src={feesImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Fees Operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="card itemCard" onClick={openMarksheetOperations}>
                                <img src={marksheetImg} className="card-img-top itemImg" alt="Materials" />
                                <div className="card-body">
                                    <p className="card-text itemName">Marksheet Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminDashboard