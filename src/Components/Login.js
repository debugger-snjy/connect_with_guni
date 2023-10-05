import React from 'react'
import ganpat_logo from "../images/Ganpat_LOGO.png";
import "../CSS/Login.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    // Code to set the Title of the Page
    let page = useLocation().pathname.replace("/", "");
    if (page === "") {
        page = "Login"
    }
    const title = "ConnectWithGUNI - " + page[0].toUpperCase() + page.slice(1,);
    document.title = title;

    // Function to Check Login
    function checkLogin() {
        var username = document.getElementById("username").value;
        var userpassword = document.getElementById("userpassword").value;

        if (username === "admin" && userpassword === "admin12345") {
            navigate("/dashboard")
        }
        else {
            navigate("/")
        }
    }

    return (
        <div className='loginPage'>

            <img src={ganpat_logo} alt="Ganpat University Logo" className='logoImg centerIt' />

            <div className="centerIt loginForm" >
                <form>

                    <input type="text" className="inputField form-control form-control-md" id="username" placeholder="Username" />
                    <input type="password" className="inputField form-control form-control-md" id="userpassword" placeholder="Password" />

                    <center>
                        <select className="form-select inputField w-50">
                            <option value="student" selected>Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                        </select>
                    </center>

                    <button className='btn btn-primary centerIt loginBtn' onClick={checkLogin}>Login</button>

                    <div className="container mt-4 myLoginLink">
                        <center>
                            <Link to='mailto:sanjayasukhwani@gmail.com'>Not have an Account, Contact Admin</Link>
                        </center>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
