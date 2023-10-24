import React from 'react'

function SubjectItem(props) {
    return (
        <div className="col-4">
            <div className="card">
                <img src={props.image} className="card-img-top itemImg" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.name + " (" + props.shortform + ")"}</h5>
                    <p className="card-text">{props.faculties}</p>
                </div>
            </div>
        </div>
    )
}

export default SubjectItem