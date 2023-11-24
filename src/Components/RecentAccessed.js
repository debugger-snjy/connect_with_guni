import React, { useEffect, useState } from 'react'
import InternalMenuBar from './InternalMenuBar';
import NavBreadcrumb from './NavBreadcrumb';
import recentImg from "../Images/recent.png"
import underconstruction from "../Images/UnderConstruction.png"


function RecentAccessed() {

    const [recentlyAccessed, setRecentlyAccessed] = useState([]);

    const FetchRecentAccessedAPI = async () => {

        // Adding the API Call to add the notes into the Database
        const response = await fetch(`http://localhost:5000/api/${sessionStorage.getItem("role")}/recentaccessed/fetch`, {
            method: "POST", // As fetchallnotes is a GET method

            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',

                // Adding the auth-token hardcore till now !
                "auth-token": sessionStorage.getItem("token"),
            },

        });

        // Variable to handle the API Response and get the results
        const allRecentAccessed = await response.json()
        console.log(allRecentAccessed)

        if (allRecentAccessed.recentAccessed === "No Records Found !!") {
            setRecentlyAccessed([])
        }
        else {
            console.log(allRecentAccessed.recentAccessed[0].recentData)
            setRecentlyAccessed(allRecentAccessed.recentAccessed[0].recentData.reverse())
        }
    }

    useEffect(() => {

        FetchRecentAccessedAPI()

    }, []);


    return (
        <>
            {/* Adding the internal Menu Bar */}
            <InternalMenuBar />

            {/* Ading all the other Operations */}
            <div className="my-4" >
                <hr className='hrStyle' />
            </div>

            <NavBreadcrumb />

            <div className="row allOperations mb-5 mt-4 text-white">
                <div className="container">

                    {recentlyAccessed.length > 0 && recentlyAccessed.map((item, index) => (
                        <div className="row">

                            <div className="col mx-4 my-2">
                                <div className="card recentCard">
                                    <div className="card-body">
                                        <p className="card-text itemName">
                                            <div className="d-flex">
                                                <div className="p-0 "><img src={recentImg} className='px-2' height={"35px"} /> {item.description}</div>
                                                <div className="p-0 flex-grow-1"><a href={item.link}>{item.link}</a></div>
                                                <div className="p-0 ">{item.timestamp}</div>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {recentlyAccessed.length === 0 && <h2 className='text-white text-capitalize text-center'>
                        {<img src={underconstruction} height={"200px"} />}
                        <br />
                        {"No Activity is Recorded Till Now !!"}
                    </h2>}

                </div>
            </div>
        </>
    )
}

export default RecentAccessed
