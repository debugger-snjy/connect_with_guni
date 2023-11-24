import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../../Context/NoteContext';
import InternalMenuBar from '../InternalMenuBar';
import NavBreadcrumb from '../NavBreadcrumb';

import feesImg from "../../Images/fees.png"

function FeesOperations() {
    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    const [FeesRecords, setFeesRecords] = useState([])
    const [EditFeesRecord, setEditFeesRecord] = useState([])

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

        FetchFeesAPI()

    }, [])


    // Function to Add the Fees Data in the Database
    const AddFeesAPI = async (event) => {

        const addFeesForm = document.getElementById("AddFeesForm")

        event.preventDefault(); // Prevent the form from submitting

        // Access form fields by their Ids
        const feesSem = document.getElementById("feesSem").value;
        const feesTitle = document.getElementById("feesTitle").value;
        const feesId = document.getElementById("feesId").value;
        const feesDate = document.getElementById("feesDate").value;
        const feesMode = document.getElementById("feesMode").value;
        const feesAmount = document.getElementById("feesAmount").value;
        const feesEnroll = document.getElementById("feesEnroll").value;

        if (feesSem === "" || feesTitle === "" || feesId === "" || feesMode === "" || feesAmount === "" || feesEnroll === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {
            // Calling the Add Fees API
            const response = await fetch(`http://localhost:5000/api/admin/upload/fees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": feesId,
                    "date": feesDate,
                    "mode": feesMode,
                    "amount": feesAmount,
                    "title": feesTitle,
                    "sem": feesSem,
                    "enroll": feesEnroll,
                })
            });

            // Variable to handle the API Response
            const addFeesResponse = await response.json()

            console.log(addFeesResponse)

            if (addFeesResponse.status === "success") {
                // After a successful submission, hide the modal
                document.getElementById("addFeesCloseBtn").click()
                contextData.showAlert("Success", addFeesResponse.msg, "alert-success")
                addFeesForm.reset();

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchFeesAPI()
            }
            else {
                contextData.showAlert("Failed", addFeesResponse.msg, "alert-danger")
            }
        }
    }

    // Function to Fetch the Fees Data in the Database
    const FetchFeesAPI = async () => {
        // Calling the Add Fees API
        const response = await fetch(`http://localhost:5000/api/admin/fetch/allfees`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const fetchFeesResponse = await response.json()

        console.log(fetchFeesResponse)

        setFeesRecords(fetchFeesResponse.fees)
    }

    // Function to Delete the Fees Data : 
    const DeleteFeesAPI = async (feesId) => {
        // Calling the Add Fees API
        const response = await fetch(`http://localhost:5000/api/admin/delete/fees/${feesId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const deleteFeesResponse = await response.json()

        console.log(deleteFeesResponse)

        // Showing the Alert Message that Fees Deleted
        contextData.showAlert("Success", deleteFeesResponse.msg, "alert-success")

        // Moving the Page to the Top
        contextData.moveToTop()

        // Again Fetching the Records to refresh the records
        FetchFeesAPI()

    }

    // Function to Edit the Fees Data : 
    const EditFeesAPI = async (feesId) => {

        const editFeesForm = document.getElementById("EditFeesForm")

        // event.preventDefault(); // Prevent the form from submitting
        console.log(EditFeesRecord)

        // Access form fields by their Ids
        const updatedfeesSem = document.getElementById("updatedfeesSem").value;
        const updatedfeesTitle = document.getElementById("updatedfeesTitle").value;
        const updatedfeesId = document.getElementById("updatedfeesId").value;
        const updatedfeesDate = document.getElementById("updatedfeesDate").value;
        const updatedfeesMode = document.getElementById("updatedfeesMode").value;
        const updatedfeesAmount = document.getElementById("updatedfeesAmount").value;
        const updatedfeesEnroll = document.getElementById("updatedfeesEnroll").value;

        // console.log(updateduserrole)

        if (updatedfeesSem === "" || updatedfeesTitle === "" || updatedfeesId === "" || updatedfeesDate === "" || updatedfeesMode === "" || updatedfeesAmount === "" || updatedfeesEnroll === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {
            // Calling the Edit Fees API
            const response = await fetch(`http://localhost:5000/api/admin/update/fees/${feesId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "date": updatedfeesDate,
                    "mode": updatedfeesMode,
                    "amount": updatedfeesAmount,
                    "title": updatedfeesTitle,
                    "sem": updatedfeesSem,
                    "enroll": updatedfeesEnroll,
                })
            });

            // Variable to handle the API Response
            const editFeesResponse = await response.json()

            console.log(editFeesResponse)

            if (editFeesResponse.status === "success") {
                // After a successful submission, hide the modal
                contextData.showAlert("Success", editFeesResponse.msg, "alert-success")
                editFeesForm.reset();
                document.getElementById("editFeescloseBtn").click()

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchFeesAPI()
            }
            else {
                contextData.showAlert("Failed", editFeesResponse.msg, "alert-danger")
            }
        }

    }

    function formatDate(feesDate) {
        const date = new Date(feesDate)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`;
    }

    const onChange = (event) => {

        // Now, Getting the data that user will be adding and that will be saved on that spot when user add the data
        setEditFeesRecord({
            ...EditFeesRecord, // This will be the data that is already present
            [event.target.name]: event.target.value
            // Using the above line, it will ADD the data and OVERWRITE if already present
            // Thus, when we write the title, then value of title will be the text that user will write
        })

        console.log("EditFees : ", EditFeesRecord)

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

                        {
                            FeesRecords.map((fees, index) => {

                                const keys = Object.keys(fees);
                                console.log(fees)

                                fees.feesDate = formatDate(fees.feesDate)

                                return (

                                    <React.Fragment key={fees._id}>
                                        {/* Fees Card */}
                                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={fees._id}>
                                            <div className="card itemCard">
                                                <img src={feesImg} className="card-img-top itemImg" alt="Materials" data-bs-toggle="modal" data-bs-target={`#FeesInfoModal${index}`} />
                                                <div className="card-body" data-bs-toggle="modal" data-bs-target={`#FeesInfoModal${index}`}>
                                                    <p className="card-text itemName">{fees.feesTitle}</p>
                                                    {/* <p className="card-text small itemName fs-5 fw-normal">{fees.feesEnroll} ₹ {fees.feesSem} [ Sem {fees.feesAmount} ]</p> */}
                                                    <p className="card-text small itemName fs-5 fw-normal">Sem {fees.feesSem} - ₹{fees.feesAmount} [ {fees.feesEnroll} ]</p>
                                                </div>
                                                <div className='card-footer'>
                                                    <div className="row">
                                                        <div className="col"><button className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#editFeesModel" onClick={() => { setEditFeesRecord(fees) }}><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> Edit Fees</button></div>
                                                        <div className="col"><button className="btn btn-dark w-100" onClick={() => { DeleteFeesAPI(fees.feesId) }}><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> Delete Fees</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fees Info Modal */}
                                        <div className="modal fade dark-modal" id={`FeesInfoModal${index}`} tabIndex="-1" aria-labelledby={`FeesInfoModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`FeesInfoModal${index}Label`}>Fees Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addFeescloseBtn" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <table className='table table-dark'>
                                                            <tbody>
                                                                {
                                                                    keys.map((data, index) => {
                                                                        console.log(data, " --> ", fees[data])
                                                                        if (data.toLowerCase() === "faculties") {
                                                                            console.log(fees[data])
                                                                        }
                                                                        if (data === "_id" || data === "__v" || data === "attendanceData" || data.toLowerCase() === "feeslectures") { }
                                                                        else {
                                                                            return (
                                                                                <tr key={"ModalInfoTable" + index}>
                                                                                    <td>{data[0].toUpperCase() + data.slice(1).toLowerCase()}</td>
                                                                                    <td>{data.toLowerCase() === "faculties" ? fees[data].join(", ") : fees[data]}</td>
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

                        <button className='btn btn-light w-50 text-black fw-bold' data-bs-toggle="modal" data-bs-target="#addFeesModel" style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", height: "50px", boxShadow: "0px 0px 25px 10px black" }}>Add New Fees</button>

                        {/* Add Fees Model */}
                        <div className="modal fade dark-modal" id="addFeesModel" aria-labelledby="addFeesModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="addFeesModelLabel">Add Fees Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { document.getElementById("AddFeesForm").reset(); }}></button>
                                    </div>

                                    {/* Form For Adding the Fees Data */}
                                    <form id='AddFeesForm'>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="feessem" className="form-label">Semester</label>
                                                <input type="number" className="form-control text-black fw-bold" id="feesSem" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesTitle" className="form-label">Fees Title</label>
                                                <input type="text" className="form-control text-black fw-bold" id="feesTitle" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesId" className="form-label">Fees Id</label>
                                                <input type="text" className="form-control text-black fw-bold" id="feesId" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesDate" className="form-label">Fees Date</label>
                                                <input type="date" className="form-control text-black fw-bold" id="feesDate" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesMode" className="form-label">Fees Payment Mode</label>
                                                <select className="form-select text-black fw-bold" id="feesMode" required >
                                                    <option className="text-black fw-bold" value={"ONLINW"}>Online</option>
                                                    <option className="text-black fw-bold" value={"CASH"}>Cash</option>
                                                    <option className="text-black fw-bold" value={"CHEQUE"}>Cheque</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesAmount" className="form-label">Fees Amount</label>
                                                <input type="text" className="form-control text-black fw-bold" id="feesAmount" required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesEnroll" className="form-label">Student Enrollment</label>
                                                <input type="text" className="form-control text-black fw-bold" id="feesEnroll" required />
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-dark">
                                            <button type="button" className="btn btn-danger" id="addFeesCloseBtn" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddFeesForm").reset(); }}>Close</button>
                                            <button type="submit" className="btn btn-success" onClick={AddFeesAPI}>Submit Form</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                        {/* Edit Fees Model */}
                        <div className="modal fade dark-modal" id="editFeesModel" tabIndex="-1" aria-labelledby="editFeesModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="editFeesModelLabel">Edit Fees Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="editFeescloseBtn" aria-label="Close" onClick={() => { document.getElementById("AddFeesForm").reset(); }}></button>
                                    </div>

                                    {/* Form For Adding the Fees Data */}
                                    <form id='EditFeesForm'>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="feessem" className="form-label">Semester</label>
                                                <input type="number" className="form-control text-black fw-bold" id="updatedfeesSem" name="feesSem" onChange={onChange} value={EditFeesRecord.feesSem} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesTitle" className="form-label">Fees Title</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedfeesTitle" name="feesTitle" onChange={onChange} value={EditFeesRecord.feesTitle} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesId" className="form-label">Fees Id</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedfeesId" name="feesId" onChange={onChange} value={EditFeesRecord.feesId} required readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesDate" className="form-label">Fees Date</label>
                                                <input type="date" className="form-control text-black fw-bold" id="updatedfeesDate" name="feesDate" onChange={onChange} value={EditFeesRecord.feesDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesMode" className="form-label">Fees Payment Mode</label>
                                                <select className="form-select text-black fw-bold" id="updatedfeesMode" name="feesMode" onChange={onChange} value={EditFeesRecord.feesMode} required >
                                                    <option className="text-black fw-bold" value={"ONLINW"}>Online</option>
                                                    <option className="text-black fw-bold" value={"CASH"}>Cash</option>
                                                    <option className="text-black fw-bold" value={"CHEQUE"}>Cheque</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesAmount" className="form-label">Fees Amount</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedfeesAmount" name="feesAmount" onChange={onChange} value={EditFeesRecord.feesAmount} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="feesEnroll" className="form-label">Student Enrollment</label>
                                                <input type="text" className="form-control text-black fw-bold" id="updatedfeesEnroll" name="feesEnroll" onChange={onChange} value={EditFeesRecord.feesEnroll} required />
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-dark">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { document.getElementById("EditFeesForm").reset(); }}>Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => { EditFeesAPI(EditFeesRecord.feesId) }}>Submit Form</button>
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

export default FeesOperations
