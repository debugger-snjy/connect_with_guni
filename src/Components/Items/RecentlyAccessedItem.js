import React from 'react'

function RecentlyAccessedItem(props) {
    return (
        <div className="d-flex item">
            <div className="p-2"><i className="fa-solid fa-book fa-2xl" style={{ "color": "#000000" }}></i></div>
            <div className="p-2 flex-grow-1 itemText">{props.item}</div>
        </div>
    )
}

export default RecentlyAccessedItem
