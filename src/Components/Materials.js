import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'; 
import InternalMenuBar from './InternalMenuBar'
import subjectBg from "../Images/materials2.png"
import SubjectItem from './Items/SubjectItem'

function Materials() {

    const [data, setData] = useState({msg:"",status:"",semesterSubjects:[]});
    const userSem = JSON.parse(localStorage.getItem("user")).sem

    useEffect(() => {
        
        // Function to Fetch the Subjects that are present
        async function fetchSemesterSubjects() {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/fetch/allsemsubjects/${userSem}`);
                const responseData = response.data;
                console.log(responseData)
                setData(responseData);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data:', error);
            }
        }

        // Call the async function
        fetchSemesterSubjects();

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

            <div className="row subjects my-5 text-white">
                <div className="container">
                    <div className="row gy-5 px-2">
                        {data.semesterSubjects.map((subject) => {
                            return (
                                <SubjectItem key={subject._id} image={subjectBg} name={subject.subjectName} shortform={subject.subjectShortForm} faculties={subject.faculties} />
                            );
                        })}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Materials
