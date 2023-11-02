import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'; 
import InternalMenuBar from './InternalMenuBar'
import subjectBg from "../Images/materials2.png"
import SubjectItem from './Items/SubjectItem'
import NavBreadcrumb from './NavBreadcrumb';

function Materials() {

    const [data, setData] = useState({msg:"",status:"",semesterSubjects:[]});
    const userSem = JSON.parse(sessionStorage.getItem("user")).sem

    // Function to call the Fetch All Subject API for the user semester !
    const fetchAllSubjectAPI = async () => {

        // API Call to fetch user data :
        // Adding the API Call to fetch the user from the Database
        const response = await fetch(`http://localhost:5000/api/admin/fetch/allsemsubjects/${userSem}`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
            },
        });

        // Variable to handle the API Response and get the results
        const allSubjectData = await response.json()
        console.log(allSubjectData)

        // Setting the data variable with the values we have
        setData(allSubjectData)

        // Sending the response Data ---> No need to return the data
        // return allSubjectData
    }

    useEffect(() => {
        
        // Call the async function
        fetchAllSubjectAPI();

        console.log(data.semesterSubjects)
    }, []); // The empty dependency array means this effect runs once, similar to componentDidMount


    return (
        <>
            {/* Adding the internal Menu Bar */}
            <InternalMenuBar />

            {/* Ading all the other Operations */}
            <div className="my-4">
                <hr className='hrStyle' />
            </div>

            <NavBreadcrumb />

            <div className="row subjects mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-4 px-2">
                        {data.semesterSubjects.map((subject) => {
                            return (
                                <SubjectItem key={subject._id} subjectId={subject._id} image={subjectBg} name={subject.subjectName} shortform={subject.subjectShortForm} faculties={subject.faculties} />
                            );
                        })}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Materials
