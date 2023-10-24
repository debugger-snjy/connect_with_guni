import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ganpat_logo from "../Images/Ganpat_LOGO.png";
import "../CSS/Login.css"
import NoteContext from '../Context/NoteContext';

function Login() {

    let navigateTo = useNavigate()

    // Using the function to get the data from the context
    const contextData = useContext(NoteContext);
    console.log(contextData.alert);

    console.log("Hello Login");

    useEffect(() => {
        const role = localStorage.getItem("role")
        if (localStorage.getItem("token")) {
            navigateTo(`/dashboard/${role}`)
        }
    })

    // Function to handle when user gets logged in !
    const handleLogin = async (event) => {

        console.log("Login Submit !");

        event.preventDefault();

        let useremail = document.getElementById("useremail").value;
        console.log(useremail);
        let userpassword = document.getElementById("userpassword").value;
        console.log(userpassword);
        let userrole = document.getElementById("userrole").value;
        console.log(userrole)


        // Adding the API Call to add the notes into the Database
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // As fetchallnotes is a GET method

            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ email: useremail, password: userpassword, role: userrole })
        });

        // Variable to handle the Login Response
        const userToken = await response.json()

        console.log(userToken);

        // If the user is registered and we get its auth-token,
        // Then we will save that auth-token in the localStorage
        if (userToken.status === "success") {

            // Showing the Alert Message
            contextData.showAlert("Success", userToken.msg, "alert-success")

            // Getting the User Info :
            const getuserResponse = await contextData.getUserInfo(userToken.authToken)

            console.log("Hii",getuserResponse)

            // Showing the Alert Box for the Fetching the Data
            contextData.showAlert("Fetching", "Fetching the User Data", "alert-warning")

            setTimeout(() => {
                // Saving auth-token in localstorage
                localStorage.setItem("token", userToken.authToken)
                localStorage.setItem("role", userrole)
                localStorage.setItem("user", JSON.stringify(getuserResponse.user))

                // Showing the Alert Box for the successfull fetching the user data
                contextData.showAlert("Success", getuserResponse.msg, "alert-success")

                navigateTo(`/dashboard/${userrole}`)

            }, 3000);

        }

        else {

            // Showing the Alert Message
            contextData.showAlert("Failed", userToken.msg, "alert-danger")

            // // Setting the status message :
            // document.getElementById("status").innerText = userToken.msg
            // document.getElementById("status").style.color = "red"
            // document.getElementById("status").style.fontWeight = 600;
        }

    }

    return (
        <>
            <div className='loginPage mb-5'>

                <img src={ganpat_logo} alt="Ganpat University Logo" className='logoImg centerIt' />

                <div className="centerIt loginForm" >

                    <div className="my-2" id='status'></div>

                    <form>

                        <input type="text" className="inputField form-control form-control-md" id="useremail" placeholder="Email" />
                        <input type="password" className="inputField form-control form-control-md" id="userpassword" placeholder="Password" />

                        <center>
                            <select className="form-select inputField w-50" id='userrole' defaultValue={"student"}>
                                <option value="student" defaultChecked>Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                            </select>
                        </center>

                        <button className='btn btn-primary centerIt loginBtn' onClick={handleLogin}>Login</button>

                        <div className="container mt-4 myLoginLink">
                            <center>
                                <Link to='mailto:sanjayasukhwani@gmail.com'>Not have an Account, Contact Admin</Link>
                            </center>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login