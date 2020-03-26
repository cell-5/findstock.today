import Autocomplete from 'react-google-autocomplete';
import React from 'react';

export default function AutoComplete({ onPlaceSelected, types}){
    return(
<Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={onPlaceSelected}
    types={types}
    componentRestrictions={{country: ["ph", "gb"]}}
/>);
}