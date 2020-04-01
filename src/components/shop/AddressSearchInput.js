import React, { useState, useEffect } from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
// import { GoogleApiWrapper } from 'google-maps-react';
// import { Input, Select } from 'antd';
import AutoComplete from '../google/AutoComplete';


const AddressSearchInput = ({ onChange, setLongLat }) => {

  // const [coordinates, setCoordinates] = useState({long: 0, lat: 1});
  // const [address, setAddress] = useState('');

  const onPlaceSelected = (data) => {
    // setCoordinates({long: data.geometry.location.lng(), lat: data.geometry.location.lat()});
    setLongLat({long: data.geometry.location.lng(), lat: data.geometry.location.lat()});
    // setAddress(data.formatted_address);
    onChange(data.formatted_address);
  };

  // useEffect(() => {
  //     onChange(address);
  //     setLongLat(coordinates);
  // }, [coordinates, address]);

  return <>
      <AutoComplete 
        onPlaceSelected={onPlaceSelected} 
        types={['geocode']} />
  </>
}

export default AddressSearchInput;

// class AddressSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }

//   handleChange = address => {
//     this.setState({ address });
//   };


//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => { this.props.handleLatLong({ latLng }); console.log('Success', latLng) })
//       .catch(error => console.error('Error', error));
//   };

//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <Input
//               {...getInputProps({
//                 placeholder: 'Search Places',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA20npNJRBlP4fwFbKSE9dblFP5dpMVTGY"
// })(AddressSearchInput)