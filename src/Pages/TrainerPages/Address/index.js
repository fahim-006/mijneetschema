import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.props.address}
                onChange={this.props.handleAddressChange}
                onSelect={this.props.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Zoek adres',
                                className: 'location-search-input',
                            })}
                        />
                        <span className="location_">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                        </span>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        key={suggestion ? suggestion.id : 0}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <div>{suggestion.description}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;