import React from 'react'
import SubjectItem from './SubjectItem';
import { Link } from 'react-router-dom';



function Subjects() {
    return (
        <div class="boxborder boxTitle p-3">
            <span><Link to={"/subjects"}>Subjects</Link></span>
            <hr className="hrStyle" />

            <div className="sampleBox">
                <SubjectItem subjectName="Theory of Computation" />
                <SubjectItem subjectName="Ethical Hacking" />
                <SubjectItem subjectName="Web Technology" />
                <SubjectItem subjectName="Artificial Intelligence" />
                <SubjectItem subjectName="Cloud Computing" />
            </div>
        </div>
    )
}

export default Subjects
