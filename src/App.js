import './App.css';

// Importing Route and Routes for the Routing, Components as well
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import SubjectMainPage from './Components/SubjectMainPage';

function App() {
    return (
        <>

            {/* Adding the Navigation Bar */}
            <Navbar />

            {/* Adding the Alert Component which will be modified later */}
            {/* <Alert title="SAMPLE" message="Your Message will be displayed Here" effect="alert-success" /> */}

            <div className="container-fluid" id='websiteContent'>

                {/* Adding and Setting the Routers */}
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/subjects' element={<SubjectMainPage />} />
                </Routes>

            </div>


        </>
    );
}

export default App;
