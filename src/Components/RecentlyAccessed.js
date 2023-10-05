import React from 'react'
import RecentlyAccessedItem from './Items/RecentlyAccessedItem'

function RecentlyAccessed() {
    return (
        <div class="boxborder boxTitle p-3">
            <span>Recently Accessed</span>
            <hr className="hrStyle" />
            <div className="sampleBox">
                <RecentlyAccessedItem item="Theory of Computation"/>
                <RecentlyAccessedItem item="Attendance"/>
                <RecentlyAccessedItem item="Fees Receipts"/>
                <RecentlyAccessedItem item="Ethical Hacking"/>
            </div>
        </div>
    )
}

export default RecentlyAccessed
