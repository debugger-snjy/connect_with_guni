import React from 'react'
import { useLocation } from 'react-router-dom';
import "../CSS/Dashboard.css";
import Subjects from './Subjects';
import Attendence from './Attendence';
import Remainders from './Remainders';
import RecentlyAccessed from './RecentlyAccessed';
import WebLinks from './WebLinks';

function Dashboard() {

    // Code to set the Title of the Page
    let page = useLocation().pathname.replace("/", "");
    if (page === "") {
        page = "Login"
    }
    const title = "ConnectWithGUNI - " + page[0].toUpperCase() + page.slice(1,);
    document.title = title;

    return (
        <>
            <div className="container-fluid text-white mt-3">
                
                <WebLinks />

                <hr className='hrStyle' />

                <div class="container-fluid text-center">
                    <div class="row">
                        <div class="mybox subjectBox col-12 col-md-12 col-lg-6 mt-3">
                            <Subjects />
                        </div>

                        <div class="mybox attendanceBox col-12 col-md-12 col-lg-6 mt-3">
                            <Attendence />
                        </div>

                        <div class="mybox notesBox col-12 col-md-12 col-lg-6 mt-3">
                            <Remainders />
                        </div>

                        <div class="mybox recentlyAccessedBox col-12 col-md-12 col-lg-6 mt-3">
                            <RecentlyAccessed />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
