import './App.css';

// Importing Route and Routes for the Routing
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from './Components/Navbar';

// Importing NoteState 
import NoteState from "./Context/NoteState"
import Alert from './Components/Alert';
import Login from './Components/Login';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import StudentDashboard from './Components/Dashboard/StudentDashboard';
import FacultyDashboard from './Components/Dashboard/FacultyDashboard';
import Materials from './Components/Materials';
import ErrorPage from './Components/ErrorPage';

function App() {
    let location = useLocation();
    console.log("Getting Location Pathname : ", location.pathname);

    const userrole = localStorage.getItem("role")

    return (
        <>
            {/* Adding all other inside it means that we want to use it all them */}
            {/* Allow to access state variables inside all the components */}
            <NoteState>

                {/* Adding Navigation Bar */}
                <Navbar />

                {/* Adding the Alert Component which will be modified later */}
                <div className="alertspace">
                    <Alert title="SAMPLE" message="Your Message will be displayed Here" effect="alert-success" />
                </div>

                <div className="container-fluid px-3" id='websiteContent'>

                    {/* Adding and Setting the Routers */}
                    <Routes>
                        <Route exact path='/' element={<Login />} />
                        <Route exact path='/dashboard/admin' element={<AdminDashboard />} />
                        <Route exact path='/dashboard/student' element={<StudentDashboard />} />
                        <Route exact path='/dashboard/faculty' element={<FacultyDashboard />} />
                        <Route exact path={`/dashboard/${userrole}/materials`} element={<Materials />} />
                        
                        {/* Define a "Not Found" route for unmatched routes */}
                        <Route path="*" element={<ErrorPage />} />

                    </Routes>
                </div>

            </NoteState>
        </>
    );
}

export default App;
