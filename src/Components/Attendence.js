import React from 'react'

function Attendence() {
    return (
        <div class="boxborder boxTitle p-3">
            <span>Attendence</span>
            <hr className="hrStyle" />
            <div className='px-3'>
                Your Overal Attendance is
                <h3>75 %</h3>
                <table className='table table-bordered text-white' border={2} width={"70%"} align='center'>
                    <tr>
                        <th className="text-black" bgcolor="#D9D9D9">Subject</th>
                        <th className="text-black" bgcolor="#D9D9D9">Attendence</th>
                    </tr>
                    <tr>
                        <td>Theory of Computation</td>
                        <td>98</td>
                    </tr>
                    <tr>
                        <td>Ethical Hacking</td>
                        <td>87</td>
                    </tr>
                    <tr>
                        <td>Artificial Intelligence</td>
                        <td>75</td>
                    </tr>
                    <tr>
                        <td>User Experience</td>
                        <td>90</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Attendence
