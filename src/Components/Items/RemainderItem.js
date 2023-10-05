import React from 'react'
import "../../CSS/items.css"

export default function RemainderItem(props) {
    return (
        <div className="d-flex item align-items-center">
            <div className="p-2"><i className="fa-solid fa-note-sticky fa-2xl" style={{ "color": "#000000" }}></i></div>
            <div className="p-2 flex-grow-1 itemText">{props.remainderTitle}<br /><small>{props.remainderDesc}</small></div>
            <div className="p-2"><i class="fa-solid fa-pen fa-xl" style={{ "color": "#000000" }}></i></div>
            <div className="p-2"><i class="fa-solid fa-trash fa-xl" style={{ "color": "#000000" }}></i></div>
        </div>
    )
}
