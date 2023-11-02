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
import SubjectMaterial from './Components/SubjectMaterial';
import Attendance from './Components/Attendance';
import Remainders from './Components/Remainders';
import FacultyDetails from './Components/FacultyDetails';
import AdminOperations from './Components/Admin Operations/AdminOperations'
import StudentOperations from './Components/Admin Operations/StudentOperations'
import FacultyOperations from './Components/Admin Operations/FacultyOperations'
import MaterialOperations from './Components/Admin Operations/MaterialOperations'
import AttendanceOperations from './Components/Admin Operations/AttendanceOperations'
import SubjectOperations from './Components/Admin Operations/SubjectOperations'
import TimetableOperations from './Components/Admin Operations/TimetableOperations'
import FeesOperations from './Components/Admin Operations/FeesOperations'
import MarksheetOperations from './Components/Admin Operations/MarksheetOperations'

function App() {
    let location = useLocation();
    // console.log("Getting Location Pathname : ", location.pathname);

    const userrole = sessionStorage.getItem("role")

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

                        {/* Login Route */}
                        <Route exact path='/' element={<Login />} />

                        {/* Student Routes */}
                        <Route exact path='/dashboard/student' element={<StudentDashboard />} />
                        <Route exact path={`/dashboard/student/materials`} element={<Materials />} />
                        <Route exact path={`/dashboard/student/attendance`} element={<Attendance />} />
                        <Route exact path={`/dashboard/student/remainders`} element={<Remainders />} />
                        <Route exact path={`/dashboard/student/facultyinfo`} element={<FacultyDetails />} />
                        <Route path={`/dashboard/student/materials/subject/:subjectname`} element={<SubjectMaterial />} />


                        {/* Faculty Routes */}
                        <Route exact path='/dashboard/faculty' element={<FacultyDashboard />} />
                        <Route exact path={`/dashboard/faculty/materials`} element={<Materials />} />
                        <Route exact path={`/dashboard/faculty/attendance`} element={<Attendance />} />
                        <Route exact path={`/dashboard/faculty/remainders`} element={<Remainders />} />
                        <Route exact path={`/dashboard/faculty/facultyinfo`} element={<FacultyDetails />} />
                        <Route path={`/dashboard/faculty/materials/subject/:subjectname`} element={<SubjectMaterial />} />

                        {/* Admin Routes */}
                        <Route exact path='/dashboard/admin' element={<AdminDashboard />} />
                        <Route exact path={'/dashboard/admin/admin_operations'} element={<AdminOperations />} />
                        <Route exact path={'/dashboard/admin/student_operations'} element={<StudentOperations />} />
                        <Route exact path={'/dashboard/admin/faculty_operations'} element={<FacultyOperations />} />
                        <Route exact path={'/dashboard/admin/materials_operations'} element={<MaterialOperations />} />
                        <Route exact path={'/dashboard/admin/attendance_operations'} element={<AttendanceOperations />} />
                        <Route exact path={'/dashboard/admin/subject_operations'} element={<SubjectOperations />} />
                        <Route exact path={'/dashboard/admin/timetable_operations'} element={<TimetableOperations />} />
                        <Route exact path={'/dashboard/admin/fees_operations'} element={<FeesOperations />} />
                        <Route exact path={'/dashboard/admin/marksheet_operations'} element={<MarksheetOperations />} />


                        {/* Define a "Error" route for unmatched routes */}
                        <Route path="*" element={<ErrorPage />} />

                    </Routes>
                </div>

            </NoteState>
        </>
    );
}

export default App;
