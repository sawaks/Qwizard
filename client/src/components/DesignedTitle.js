import React from 'react';


const DesignedTitle = ({ title, src, color }) => {
    return (

        <div className="title-conatiner">
            <h2 style={{ backgroundColor: color }}>{title}</h2>
            <div className="icon-container" >
                <img src={src} style={{ width: "35px", marginTop: "2px" }} alt={src} />
            </div>
        </div>
    )
}

export default DesignedTitle;