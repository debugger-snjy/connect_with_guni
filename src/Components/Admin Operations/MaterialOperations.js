import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../../Context/NoteContext';
import InternalMenuBar from '../InternalMenuBar';
import NavBreadcrumb from '../NavBreadcrumb';
import pdfIcon from "../../Images/pdfIcon.png"
import excelIcon from "../../Images/excelIcon.png"
import imageIcon from "../../Images/imageIcon.png"
import docIcon from "../../Images/docIcon.png"
import audioIcon from "../../Images/audioIcon.png"
import unknownIcon from "../../Images/unknownIcon.png"

function MaterialOperations() {
    // Used to navigate things
    let navigateTo = useNavigate()
    let location = useLocation()

    const [MaterialRecords, setMaterialRecords] = useState([])

    // Using the Context API
    const contextData = useContext(NoteContext);

    if (!sessionStorage.getItem("user") && !sessionStorage.getItem("token") && !sessionStorage.getItem("role") === "admin") {

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

        FetchMaterialAPI();

    }, [])

    // Function to Add the Material Data in the Database
    const AddMaterialAPI = async (event) => {

        const addMaterialForm = document.getElementById("AddMaterialForm")

        event.preventDefault(); // Prevent the form from submitting

        // Access form fields by their Ids
        const fileSemester = document.getElementById("fileSemester").value
        const fileSubject = document.getElementById("fileSubject").value
        const fileUploadername = document.getElementById("fileUploadername").value
        const submittedFile = document.getElementById("submittedFile").files[0];

        if (fileSemester === "" || fileSubject === "" || fileUploadername === "" || submittedFile === "") {
            contextData.showAlert("Failed", "Some Fields are Empty !", "alert-danger")
        }
        else {

            var data = new FormData()
            data.append("sem", fileSemester,)
            data.append("subject", fileSubject,)
            data.append("uploadername", fileUploadername,)
            data.append("file", submittedFile,)

            // Calling the Add Material API
            const response = await fetch(`http://localhost:5000/api/admin/materials/upload`, {
                method: "POST",
                body: data
            });

            // Variable to handle the API Response
            const addMaterialResponse = await response.json()

            console.log(addMaterialResponse)

            if (addMaterialResponse.status === "success") {
                // After a successful submission, hide the modal
                contextData.showAlert("Success", addMaterialResponse.msg, "alert-success")
                addMaterialForm.reset();
                document.getElementById("AddMaterialFormCloseBtn").click()

                // Moving the Page to the Top
                contextData.moveToTop()

                // Fetching the Records Again for the Updated Records
                FetchMaterialAPI()
            }
            else {
                contextData.showAlert("Failed", addMaterialResponse.msg, "alert-danger")
            }
        }
    }

    // Function to Fetch the Material Data in the Database
    const FetchMaterialAPI = async () => {
        // Calling the Add Material API
        const response = await fetch(`http://localhost:5000/api/admin/fetch/allmaterials`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const fetchMaterialResponse = await response.json()

        console.log(fetchMaterialResponse)

        setMaterialRecords(fetchMaterialResponse.materials)
    }

    // Function to Delete the Material Data : 
    const DeleteMaterialAPI = async (materialId) => {
        // Calling the Delete Material API
        const response = await fetch(`http://localhost:5000/api/admin/delete/material/${materialId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Variable to handle the API Response
        const deleteMaterialResponse = await response.json()

        console.log(deleteMaterialResponse)

        // Showing the Alert Message that Material Deleted
        contextData.showAlert("Success", deleteMaterialResponse.msg, "alert-success")

        // Moving the Page to the Top
        contextData.moveToTop()

        // Again Fetching the Records to refresh the records
        FetchMaterialAPI()

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

                        {/* All Material Records */}
                        {
                            MaterialRecords.map((material, index) => {

                                const keys = Object.keys(material);
                                let materialImg;
                                {/* console.log(material) */ }

                                if (material.type === 'image') {
                                    materialImg = imageIcon
                                }
                                if (material.type === 'pdf') {
                                    materialImg = pdfIcon
                                }
                                if (material.type === 'excel') {
                                    materialImg = excelIcon
                                }
                                if (material.type === 'doc') {
                                    materialImg = docIcon
                                }
                                if (material.type === 'audio') {
                                    materialImg = audioIcon
                                }
                                if (material.type === 'unknown') {
                                    materialImg = unknownIcon
                                }

                                return (

                                    <React.Fragment key={material._id}>
                                        {/* Material Card */}
                                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={material._id}>
                                            <div className="card itemCard">
                                                <img src={materialImg} className="card-img-top itemImg" alt="Materials" data-bs-toggle="modal" data-bs-target={`#MaterialInfoModal${index}`} />
                                                <div className="card-body" data-bs-toggle="modal" data-bs-target={`#MaterialInfoModal${index}`}>
                                                    <p className="card-text itemName">{material.title}</p>
                                                    <p className="card-text small itemName fs-5 fw-normal">{material.subject} Subject - Sem {material.sem}</p>
                                                </div>
                                                <div className='card-footer'>
                                                    <div className="row">
                                                        {/* No Edit Record is required  */}
                                                        <div className="col"><button className="btn btn-dark w-100" onClick={() => { DeleteMaterialAPI(material._id) }}><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> Delete Material</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Material Info Modal */}
                                        <div className="modal fade dark-modal" id={`MaterialInfoModal${index}`} tabIndex="-1" aria-labelledby={`MaterialInfoModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`MaterialInfoModal${index}Label`}>Material Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addMaterialcloseBtn" aria-label="Close"></button>
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
                                                                                    <td>{material[data]}</td>
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

                        <button className='btn btn-light w-50 text-black fw-bold' data-bs-toggle="modal" data-bs-target="#addMaterialModel" style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", height: "50px", boxShadow: "0px 0px 25px 10px black" }}>Add New Material</button>

                        {/* Add Material Model */}
                        <div className="modal fade dark-modal" id="addMaterialModel" tabIndex="-1" aria-labelledby="addMaterialModelLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content bg-dark text-light">
                                    <div className="modal-header bg-dark text-light">
                                        <h1 className="modal-title fs-5" id="addMaterialModelLabel">Add Material Form</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addMaterialcloseBtn" aria-label="Close" onClick={() => { document.getElementById("AddMaterialForm").reset(); }}></button>
                                    </div>

                                    {/* Form For Adding the Material Data */}
                                    <form id='AddMaterialForm' encType="multipart/form-data">
                                        <div className="modal-body">
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
                                            <button type="button" id="AddMaterialFormCloseBtn" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddMaterialForm").reset(); }}>Close</button>
                                            <button type="submit" className="btn btn-success" onClick={AddMaterialAPI}>Submit Form</button>
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

export default MaterialOperations
