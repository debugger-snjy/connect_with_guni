import React from 'react'
import ganpat_icon from "../images/Ganpat_Icon.png";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><strong> <img src={ganpat_icon} width={"30px"} alt='Ganpat Logo'/> ConnectWithGUNI</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item dropdown px-lg-2 px-md-1 px-0">
                            <Link className="nav-link dropdown-toggle text-black" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Syllabus
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" target='_blank' to="https://uvpce.guni.ac.in/programmes/after-12th-programs-undergraduate-programs/engineering-technology/bachelor-of-technology-in-computer-engineering/syllabus">Computer Engineering</Link></li>
                                <li><Link className="dropdown-item" target='_blank' to="https://uvpce.guni.ac.in/programmes/after-12th-programs-undergraduate-programs/engineering-technology/bachelor-of-technology-in-information-technology/syllabus">Information Technology</Link></li>
                                <li><Link className="dropdown-item" target='_blank' to="https://uvpce.guni.ac.in/programmes/after-12th-programs-undergraduate-programs/engineering-technology/bachelor-of-technology-in-computer-engineering-artificial-intelligence/syllabus">Computer Engineering - AI</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item px-lg-2 px-md-1 px-0">
                            <Link className="nav-link text-black" aria-current="page" to="https://www.ganpatuniversity.ac.in/about/about-university">About</Link>
                        </li>
                        <li className="nav-item px-lg-2 px-md-1 px-0">
                            <Link className="nav-link text-black" aria-current="page" to="https://www.ganpatuniversity.ac.in/contact-us">Contact Us</Link>
                        </li>
                    </ul>
                    <Link className="nav-link text-black" aria-current="page" to="/">
                        <i className="fa-solid fa-circle-half-stroke px-lg-2 px-md-1 px-0" style={{ "color": "#000000" }}></i> Dark Mode
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar