import React from 'react'
import "../../CSS/items.css"

export default function SubjectItem(props) {
    return (
        <div className="d-flex item">
            <div className="p-2"><i className="fa-solid fa-book fa-2xl" style={{ "color": "#000000" }}></i></div>
            <div className="p-2 flex-grow-1 itemText">{props.subjectName}</div>
            <div className="p-2"><i className="fa-solid fa-caret-right fa-2xl" style={{ "color": "#000000" }}></i></div>
        </div>
    )
}
