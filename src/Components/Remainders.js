import React from 'react'
import RemainderItem from "./Items//RemainderItem"

function Remainders() {
    return (
        <div class="boxborder boxTitle p-3">
            <span>Remainders</span>
            <hr className="hrStyle" />
            <div className="sampleBox">

                <RemainderItem remainderTitle="EH - Practical 5" remainderDesc="Complete Practical 5" />
                <RemainderItem remainderTitle="WT - Practical 4" remainderDesc="Complete Practical 4" />

            </div>
        </div>
    )
}

export default Remainders
