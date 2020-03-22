import React from 'react';

const onClick = (callback) => {
    navigator.geolocation.getCurrentPosition(
    (location) =>callback(location.coords),
    (error)=>{})
}
export default function CurrentLocation({ coordsChanged }){

    return (
        <div>
            <a onClick={ onClick.bind(this, coordsChanged)}>
            <img
        className='current-loc-ico'  
        src="https://www.materialui.co/materialIcons/maps/my_location_black_192x192.png">
            </img>
            </a>
        </div>
    )
}