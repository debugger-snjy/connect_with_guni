import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../../Context/NoteContext';
import InternalMenuBar from '../InternalMenuBar';
import NavBreadcrumb from '../NavBreadcrumb';
import AttendanceBookImg from "../../Images/attendance_sheet.png"

function AttendanceOperations() {
    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    // Using the Context API
    const contextData = useContext(NoteContext);

    const [AttendanceRecords, setAttendanceRecords] = useState([])

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

        FetchAttendanceAPI();

    }, [])

    // Function to Fetch the Attendance Data in the Database
    const FetchAttendanceAPI = async () => {
        // Calling the Add Attendance API
        const response = await fetch(`http://localhost:5000/api/${sessionStorage.getItem("role")}/attendance/fetch`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const fetchAttendanceResponse = await response.json()

        console.log(fetchAttendanceResponse)

        setAttendanceRecords(fetchAttendanceResponse.attendance)
    }

    // Function to Add the Attendance Data in the Database
    const AddAttendanceAPI = async (event) => {

        const addAttendanceForm = document.getElementById("AddAttendanceForm")

        event.preventDefault(); // Prevent the form from submitting

        // Access form fields by their Ids
        const fileSemester = document.getElementById("fileSemester").value
        const fileTitle = document.getElementById("fileTitle").value
        const fileSubject = document.getElementById("fileSubject").value
        const fileUploadername = document.getElementById("fileUploadername").value
        const submittedFile = document.getElementById("submittedFile").files[0];

        if (fileSemester === "" || fileSubject === "" || fileUploadername === "" || submittedFile === "" || fileTitle === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {

            var data = new FormData()
            data.append("title", fileTitle)
            data.append("sem", fileSemester)
            data.append("subject", fileSubject)
            data.append("uploadedBy", fileUploadername)
            data.append("file", submittedFile)

            // Calling the Add Attendance API
            const response = await fetch(`http://localhost:5000/api/${sessionStorage.getItem("role")}/attendance/upload`, {
                method: "POST",
                body: data
            });

            // Variable to handle the API Response
            const addAttendanceResponse = await response.json()

            console.log(addAttendanceResponse)

            if (addAttendanceResponse.status === "success") {
                // After a successful submission, hide the modal
                contextData.showAlert("Success", addAttendanceResponse.msg, "alert-success")
                addAttendanceForm.reset();
                document.getElementById("AddAttendanceFormCloseBtn").click()

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchAttendanceAPI()
            }
            else {
                contextData.showAlert("Failed", addAttendanceResponse.msg, "alert-danger")
                // Moving the Page to the Top
                contextData.moveToTop()
            }
        }
    }

    return (
        <>

            {/* Adding the internal Menu Bar */}
            <InternalMenuBar />

            {/* Ading all the other Operations */}
            <div className="my-4">
                <hr className='hrStyle' />
            </div>

            <NavBreadcrumb />

            {/* All the Cards */}
            <div className="row allOperations mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-4 px-2">

                        {/* All Attendance Records */}
                        {
                            AttendanceRecords.map((file, index) => {

                                const keys = Object.keys(file);

                                return (

                                    <React.Fragment key={"file" + index}>
                                        {/* Attendance Card */}
                                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={file._id}>
                                            <div className="card itemCard">
                                                <span className="badge rounded-pill bg-dark card-text px-2 tags" style={{ position: "absolute", width: "107px", top: "5px", right: "5px", }}> <i className="fa-solid fa-sm fa-tags" style={{ "color": "white" }}></i> {file.uploadedBy[0].toUpperCase() + file.uploadedBy.slice(1).toLowerCase()}</span>
                                                <img src={AttendanceBookImg} className="card-img-top itemImg" alt="Attendances" data-bs-toggle="modal" data-bs-target={`#AttendanceInfoModal${index}`} />
                                                <div className="card-body" data-bs-toggle="modal" data-bs-target={`#AttendanceInfoModal${index}`}>
                                                    <p className="card-text itemName">{file.title}</p>
                                                    <p className="card-text small itemName fs-5 p-0 mt-1 m-0 fw-normal">Semester {file.sem} - {file.subject} Subject</p>
                                                    <p className="card-text small itemName fs-5 p-0 mt-1 fw-normal">Date : {file.date}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal fade dark-modal" id={`AttendanceInfoModal${index}`} tabIndex="-1" aria-labelledby={`AttendanceInfoModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`AttendanceInfoModal${index}Label`}>Attendance Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addAttendancecloseBtn" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <table className='table table-dark'>
                                                            <tbody>
                                                                {
                                                                    keys.map((data, index) => {
                                                                        {/* console.log(data, " --> ", material[data]) */ }
                                                                        if (data === "_id" || data === "__v") { }
                                                                        else {
                                                                            return (
                                                                                <tr key={"ModalInfoTable" + index}>
                                                                                    <td>{data[0].toUpperCase() + data.slice(1).toLowerCase()}</td>
                                                                                    <td>{file[data]}</td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="modal-footer bg-dark">
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }

                        <button className='btn btn-light w-50 text-black fw-bold' data-bs-toggle="modal" data-bs-target="#addAttendanceModel" style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", height: "50px", boxShadow: "0px 0px 25px 10px black" }}>Add New Attendance</button>

                        {/* Add Attendance Model */}
                        <div className="modal fade dark-modal" id="addAttendanceModel" tabIndex="-1" aria-labelledby="addAttendanceModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="addAttendanceModelLabel">Add Attendance Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addAttendancecloseBtn" aria-label="Close" onClick={() => { document.getElementById("AddAttendanceForm").reset(); }}></button>
                                    </div>

                                    {/* Form For Adding the Attendance Data */}
                                    <form id='AddAttendanceForm' encType="multipart/form-data">
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="fileSemester" className="form-label">File Title</label>
                                                <input type="text" className="form-control text-black fw-bold" id="fileTitle" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="fileSemester" className="form-label">Semester</label>
                                                <input type="number" className="form-control text-black fw-bold" id="fileSemester" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="fileSubject" className="form-label">Subject</label>
                                                <input type="text" className="form-control text-black fw-bold" id="fileSubject" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="fileUploadername" className="form-label">Uploader Name</label>
                                                <input type="text" className="form-control text-black fw-bold" id="fileUploadername" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="submittedFile" className="form-label">File</label>
                                                <input type="file" className="form-control text-black fw-bold" id="submittedFile" required />
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-dark">
                                            <button type="button" id="AddAttendanceFormCloseBtn" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddAttendanceForm").reset(); }}>Close</button>
                                            <button type="submit" className="btn btn-success" onClick={AddAttendanceAPI}>Submit Form</button>
                                        </div>
                                    </form>

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
