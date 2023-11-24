import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../../Context/NoteContext';
import InternalMenuBar from '../InternalMenuBar';
import NavBreadcrumb from '../NavBreadcrumb';

import marksheetImg from "../../Images/marksheetImg.png"

function MarksheetOperations() {

    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    const [MarksheetRecords, setMarksheetRecords] = useState([])
    const [EditMarksheetRecord, setEditMarksheetRecord] = useState([])

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

        // Moving the Page to the Top
        contextData.moveToTop()

        FetchMarksheetAPI()

    }, [])


    // Function to Add the Marksheet Data in the Database
    const AddMarksheetAPI = async (event) => {

        const addMarksheetForm = document.getElementById("AddMarksheetForm")

        event.preventDefault(); // Prevent the form from submitting

        // Access form fields by their Ids
        const marksheetSem = document.getElementById("marksheetSem").value;
        const marksheetTitle = document.getElementById("marksheetTitle").value;
        const marksheetId = document.getElementById("marksheetId").value;
        const marksheetDate = document.getElementById("marksheetDate").value;
        const marksheetMode = document.getElementById("marksheetMode").value;
        const marksheetAmount = document.getElementById("marksheetAmount").value;
        const marksheetEnroll = document.getElementById("marksheetEnroll").value;

        if (marksheetSem === "" || marksheetTitle === "" || marksheetId === "" || marksheetMode === "" || marksheetAmount === "" || marksheetEnroll === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {
            // Calling the Add Marksheet API
            const response = await fetch(`http://localhost:5000/api/admin/upload/marksheet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": marksheetId,
                    "date": marksheetDate,
                    "mode": marksheetMode,
                    "amount": marksheetAmount,
                    "title": marksheetTitle,
                    "sem": marksheetSem,
                    "enroll": marksheetEnroll,
                })
            });

            // Variable to handle the API Response
            const addMarksheetResponse = await response.json()

            console.log(addMarksheetResponse)

            if (addMarksheetResponse.status === "success") {
                // After a successful submission, hide the modal
                document.getElementById("addMarksheetCloseBtn").click()
                contextData.showAlert("Success", addMarksheetResponse.msg, "alert-success")
                addMarksheetForm.reset();

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchMarksheetAPI()
            }
            else {
                contextData.showAlert("Failed", addMarksheetResponse.msg, "alert-danger")
            }
        }
    }

    // Function to Fetch the Marksheet Data in the Database
    const FetchMarksheetAPI = async () => {
        // Calling the Add Marksheet API
        const response = await fetch(`http://localhost:5000/api/admin/fetch/allmarksheet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const fetchMarksheetResponse = await response.json()

        console.log(fetchMarksheetResponse)

        setMarksheetRecords(fetchMarksheetResponse.marksheet)
    }

    // Function to Delete the Marksheet Data : 
    const DeleteMarksheetAPI = async (marksheetId) => {
        // Calling the Add Marksheet API
        const response = await fetch(`http://localhost:5000/api/admin/delete/marksheet/${marksheetId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const deleteMarksheetResponse = await response.json()

        console.log(deleteMarksheetResponse)

        // Showing the Alert Message that Marksheet Deleted
        contextData.showAlert("Success", deleteMarksheetResponse.msg, "alert-success")

        // Moving the Page to the Top
        contextData.moveToTop()

        // Again Fetching the Records to refresh the records
        FetchMarksheetAPI()

    }

    // Function to Edit the Marksheet Data : 
    const EditMarksheetAPI = async (marksheetId) => {

        const editMarksheetForm = document.getElementById("EditMarksheetForm")

        // event.preventDefault(); // Prevent the form from submitting
        console.log(EditMarksheetRecord)

        // Access form fields by their Ids
        const updatedmarksheetSem = document.getElementById("updatedmarksheetSem").value;
        const updatedmarksheetTitle = document.getElementById("updatedmarksheetTitle").value;
        const updatedmarksheetId = document.getElementById("updatedmarksheetId").value;
        const updatedmarksheetDate = document.getElementById("updatedmarksheetDate").value;
        const updatedmarksheetMode = document.getElementById("updatedmarksheetMode").value;
        const updatedmarksheetAmount = document.getElementById("updatedmarksheetAmount").value;
        const updatedmarksheetEnroll = document.getElementById("updatedmarksheetEnroll").value;

        // console.log(updateduserrole)

        if (updatedmarksheetSem === "" || updatedmarksheetTitle === "" || updatedmarksheetId === "" || updatedmarksheetDate === "" || updatedmarksheetMode === "" || updatedmarksheetAmount === "" || updatedmarksheetEnroll === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {
            // Calling the Edit Marksheet API
            const response = await fetch(`http://localhost:5000/api/admin/update/marksheet/${marksheetId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "date": updatedmarksheetDate,
                    "mode": updatedmarksheetMode,
                    "amount": updatedmarksheetAmount,
                    "title": updatedmarksheetTitle,
                    "sem": updatedmarksheetSem,
                    "enroll": updatedmarksheetEnroll,
                })
            });

            // Variable to handle the API Response
            const editMarksheetResponse = await response.json()

            console.log(editMarksheetResponse)

            if (editMarksheetResponse.status === "success") {
                // After a successful submission, hide the modal
                contextData.showAlert("Success", editMarksheetResponse.msg, "alert-success")
                editMarksheetForm.reset();
                document.getElementById("editMarksheetcloseBtn").click()

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchMarksheetAPI()
            }
            else {
                contextData.showAlert("Failed", editMarksheetResponse.msg, "alert-danger")
            }
        }

    }

    function formatDate(marksheetDate) {
        const date = new Date(marksheetDate)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`;
    }

    const onChange = (event) => {

        // Now, Getting the data that user will be adding and that will be saved on that spot when user add the data
        setEditMarksheetRecord({
            ...EditMarksheetRecord, // This will be the data that is already present
            [event.target.name]: event.target.value
            // Using the above line, it will ADD the data and OVERWRITE if already present
            // Thus, when we write the title, then value of title will be the text that user will write
        })

        console.log("EditMarksheet : ", EditMarksheetRecord)

    }

    let subjectCount = 1;

    const addSubject = () => {
        subjectCount++; 

        const subjectDetails = document.getElementById("subjectDetails");
        const newSubjectRow = document.createElement("tr");
        newSubjectRow.classList.add("subject-row");

        newSubjectRow.innerHTML = `
            <td>
                <div class="mb-1">
                    ${subjectCount}
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="text" class="form-control text-black fw-bold" id="code1" name="code[]" required />
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="text" class="form-control text-black fw-bold" id="subject1" name="subject[]" required />
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="number" class="form-control text-black fw-bold" id="credits1" name="credits[]" required />
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="text" class="form-control text-black fw-bold" id="grade1" name="grade[]" required />
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="number" class="form-control text-black fw-bold" id="score1" name="score[]" required />
                </div>
            </td>
            <td>
                <div class="mb-1">
                    <input type="number" class="form-control text-black fw-bold" id="total1" name="total[]" required />
                </div>
            </td>
        `;

        subjectDetails.appendChild(newSubjectRow);
    }

    // document.getElementById("markSheetForm").addEventListener("submit", function (event) {
    //     event.preventDefault();
    //     const formData = new FormData(this);
    //     const formObject = {};
    //     formData.forEach((value, key) => {
    //         if (key.endsWith("[]")) {
    //             const baseKey = key.slice(0, -2);
    //             if (!formObject[baseKey]) {
    //                 formObject[baseKey] = [];
    //             }
    //             formObject[baseKey].push(value);
    //         } else {
    //             formObject[key] = value;
    //         }
    //     });
    //     console.log(formObject);
    //     // Perform further actions with the form data, such as sending it to a server
    // });

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

                        {
                            MarksheetRecords.map((marksheet, index) => {

                                const keys = Object.keys(marksheet);
                                console.log(marksheet)

                                marksheet.marksheetDate = formatDate(marksheet.marksheetDate)

                                return (

                                    <React.Fragment key={marksheet._id}>
                                        {/* Marksheet Card */}
                                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={marksheet._id}>
                                            <div className="card itemCard">
                                                <img src={marksheetImg} className="card-img-top itemImg" alt="Materials" data-bs-toggle="modal" data-bs-target={`#MarksheetInfoModal${index}`} />
                                                <div className="card-body" data-bs-toggle="modal" data-bs-target={`#MarksheetInfoModal${index}`}>
                                                    <p className="card-text itemName">{marksheet.marksheetTitle}</p>
                                                    {/* <p className="card-text small itemName fs-5 fw-normal">{marksheet.marksheetEnroll} ₹ {marksheet.marksheetSem} [ Sem {marksheet.marksheetAmount} ]</p> */}
                                                    <p className="card-text small itemName fs-5 fw-normal">Sem {marksheet.marksheetSem} - {marksheet.marksheetEnroll} </p>
                                                </div>
                                                <div className='card-footer'>
                                                    <div className="row">
                                                        <div className="col"><button className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#editMarksheetModel" onClick={() => { setEditMarksheetRecord(marksheet) }}><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> Edit Marksheet</button></div>
                                                        <div className="col"><button className="btn btn-dark w-100" onClick={() => { DeleteMarksheetAPI(marksheet.marksheetId) }}><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> Delete Marksheet</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Marksheet Info Modal */}
                                        <div className="modal fade dark-modal" id={`MarksheetInfoModal${index}`} tabIndex="-1" aria-labelledby={`MarksheetInfoModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-xl">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`MarksheetInfoModal${index}Label`}>Marksheet Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addMarksheetcloseBtn" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <table className='table table-dark'>
                                                            <tbody>
                                                                {
                                                                    keys.map((data, index) => {
                                                                        let fieldname = "Marksheet " + data.split("marksheet")[1]
                                                                        console.log(data, " --> ", marksheet[data])
                                                                        if (data === "_id" || data === "__v" || data === "attendanceData" || data.toLowerCase() === "marksheetlectures") { }
                                                                        else if (data === "marksheetData") {
                                                                            return (
                                                                                <tr key={"ModalInfoTable" + index}>
                                                                                    <td colSpan={2} className='p-3'>
                                                                                        <table className='table table-dark table-striped table-bordered my-2'>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td colSpan={7} align='center'><h5>Subject Wise Report [{marksheet.marksheetTitle}]</h5></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td align='center' className='fw-bold'>Sr. No</td>
                                                                                                    <td align='center' className='fw-bold'>Subject Code</td>
                                                                                                    <td align='center' className='fw-bold'>Subject Name</td>
                                                                                                    <td align='center' className='fw-bold'>Credits</td>
                                                                                                    <td align='center' className='fw-bold'>Grade</td>
                                                                                                    <td align='center' className='fw-bold'>Grade Point</td>
                                                                                                    <td align='center' className='fw-bold'>Total Credit</td>
                                                                                                </tr>
                                                                                                {
                                                                                                    marksheet.marksheetData.map((subject, index) => {
                                                                                                        return (
                                                                                                            <tr key={index}>
                                                                                                                <td align='center'>{index + 1}</td>
                                                                                                                <td align='center'>{subject[0]}</td>
                                                                                                                <td align='center'>{subject[1]}</td>
                                                                                                                <td align='center'>{subject[2]}</td>
                                                                                                                <td align='center'>{subject[3]}</td>
                                                                                                                <td align='center'>{subject[4]}</td>
                                                                                                                <td align='center'>{subject[5]}</td>
                                                                                                            </tr>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <tr key={"ModalInfoTable" + index}>
                                                                                    <td>{fieldname}</td>
                                                                                    <td>{marksheet[data]}</td>
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

                        <button className='btn btn-light w-50 text-black fw-bold' data-bs-toggle="modal" data-bs-target="#addMarksheetModel" style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", height: "50px", boxShadow: "0px 0px 25px 10px black" }}>Add New Marksheet</button>

                        {/* Add Marksheet Model */}
                        <div className="modal fade dark-modal" id="addMarksheetModel" aria-labelledby="addMarksheetModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg modal-xl">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="addMarksheetModelLabel">Add Marksheet Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { document.getElementById("AddMarksheetForm").reset(); subjectCount = 1; }}></button>
                                    </div>

                                    {/* Form For Adding the Marksheet Data */}

                                    <form id="AddMarksheetForm">

                                        <div className="modal-body">

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="marksheetsem" className="form-label">Marksheet Semester</label>
                                                        <input type="number" className="form-control text-black fw-bold" id="marksheetSem" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="sem" className="form-label">Current Semester:</label>
                                                        <input type="text" className="form-control text-black fw-bold" id="sem" name="sem" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="id" className="form-label">ID:</label>
                                                        <input type="text" className="form-control text-black fw-bold" id="id" name="id" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="title" className="form-label">Title:</label>
                                                        <input type="text" className="form-control text-black fw-bold" id="title" name="title" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="enroll" className="form-label">Enrollment:</label>
                                                        <input type="text" className="form-control text-black fw-bold" id="enroll" name="enroll" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="date" className="form-label">Date:</label>
                                                        <input type="date" className="form-control text-black fw-bold" id="date" name="date" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="result" className="form-label">Result:</label>
                                                        <input type="text" className="form-control text-black fw-bold" id="result" name="result" required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-2">
                                                        <label htmlFor="grade" className="form-label">Grade:</label>
                                                        <input type="number" className="form-control text-black fw-bold" step="0.01" id="grade" name="grade" required />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="mt-4 mb-2">
                                                <hr className='hrStyle' />
                                            </div>
                                            <h3 className='text-center'>SUBJECT WISE DETAILS</h3>

                                            <div class="subject-row">
                                                <table className='table table-dark table-striped table-bordered my-2'>
                                                    <tbody id='subjectDetails'>
                                                        <tr className='text-center'>
                                                            <th>No.</th>
                                                            <th>Code</th>
                                                            <th>Subject</th>
                                                            <th>Credits</th>
                                                            <th>Grade</th>
                                                            <th>Score</th>
                                                            <th>Total</th>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="mb-1 text-center">
                                                                    {subjectCount}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="text" className="form-control text-black fw-bold" id="code1" name="code[]" required />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="text" className="form-control text-black fw-bold" id="subject1" name="subject[]" required />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="number" className="form-control text-black fw-bold" id="credits1" name="credits[]" required />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="text" className="form-control text-black fw-bold" id="grade1" name="grade[]" required />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="number" className="form-control text-black fw-bold" id="score1" name="score[]" required />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <input type="number" className="form-control text-black fw-bold" id="total1" name="total[]" required />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-dark">
                                            <button type="button" className="btn btn-primary" onClick={addSubject}>Add New Subject</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddMarksheetForm").reset(); subjectCount = 1; }} >Close</button>
                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Submit</button>

                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                        {/* Edit Marksheet Model */}
                        <div className="modal fade dark-modal" id="editMarksheetModel" tabIndex="-1" aria-labelledby="editMarksheetModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="editMarksheetModelLabel">Edit Marksheet Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="editMarksheetcloseBtn" aria-label="Close" onClick={() => { document.getElementById("AddMarksheetForm").reset(); }}></button>
                                    </div>

                                    {/* Form For Adding the Marksheet Data */}
                                    <form id='EditMarksheetForm'>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="marksheetsem" className="form-label">Semester</label>
                                                <input type="number" className="form-control text-black fw-bold" id="updatedmarksheetSem" name="marksheetSem" onChange={onChange} value={EditMarksheetRecord.marksheetSem} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetTitle" className="form-label">Marksheet Title</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedmarksheetTitle" name="marksheetTitle" onChange={onChange} value={EditMarksheetRecord.marksheetTitle} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetId" className="form-label">Marksheet Id</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedmarksheetId" name="marksheetId" onChange={onChange} value={EditMarksheetRecord.marksheetId} required readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetDate" className="form-label">Marksheet Date</label>
                                                <input type="date" className="form-control text-black fw-bold" id="updatedmarksheetDate" name="marksheetDate" onChange={onChange} value={EditMarksheetRecord.marksheetDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetMode" className="form-label">Marksheet Payment Mode</label>
                                                <select className="form-select text-black fw-bold" id="updatedmarksheetMode" name="marksheetMode" onChange={onChange} value={EditMarksheetRecord.marksheetMode} required >
                                                    <option className="text-black fw-bold" value={"ONLINW"}>Online</option>
                                                    <option className="text-black fw-bold" value={"CASH"}>Cash</option>
                                                    <option className="text-black fw-bold" value={"CHEQUE"}>Cheque</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetAmount" className="form-label">Marksheet Amount</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedmarksheetAmount" name="marksheetAmount" onChange={onChange} value={EditMarksheetRecord.marksheetAmount} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="marksheetEnroll" className="form-label">Student Enrollment</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedmarksheetEnroll" name="marksheetEnroll" onChange={onChange} value={EditMarksheetRecord.marksheetEnroll} required />
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-dark">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { document.getElementById("EditMarksheetForm").reset(); }}>Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => { EditMarksheetAPI(EditMarksheetRecord.marksheetId) }}>Submit Form</button>
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

export default MarksheetOperations
