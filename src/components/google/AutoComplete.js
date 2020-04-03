import Autocomplete from 'react-google-autocomplete';
import React from 'react';

export default function AutoComplete({ onPlaceSelected, types}){
    return(
<Autocomplete
    style={{width: '90%', border: '1px solid #d9d9d9', borderRadius: '2px', padding: '0.2rem', paddingLeft: '0.5rem'}}
    onPlaceSelected={onPlaceSelected}
    types={types}
    componentRestrictions={{country: ["ph", "gb"]}}
/>);
}