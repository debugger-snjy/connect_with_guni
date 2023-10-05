import React from 'react'

export default function SubjectItem(props) {
    return (
        <div className='sample text-black' style={{ "backgroundColor": "#D9D9D9" }}>
            
            <table>
                <tr>
                    <td>{props.remainderTitle}</td>
                    <td rowSpan={2}><i class="fa-solid fa-pen" style={{ "color": "#000000" }}></i></td>
                    <td rowSpan={2}><i class="fa-solid fa-trash" style={{ "color": "#000000" }}></i></td>
                </tr>
                <tr>
                    <td style={{ "fontStyle": "normal", "fontWeight": "normal" }}><small>{props.remainderDesc}</small></td>
                </tr>
            </table>
        </div>
    )
}
