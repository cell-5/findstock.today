import React, { useEffect } from 'react';

const onClick = (callback) => {
    navigator.geolocation.getCurrentPosition(
    (location) =>callback(location.coords),
    (error)=>{})
}
export default function CurrentLocation({ onChange }){
    // useEffect(() => {
    //     onClick(onChange);
    // }, []);

    return (
        <div>
            <a onClick={ onClick.bind(this, onChange)}>
            <img
                className='current-loc-ico'  
                src="https://www.materialui.co/materialIcons/maps/my_location_black_192x192.png">
            </img>
            </a>
        </div>
    )
}