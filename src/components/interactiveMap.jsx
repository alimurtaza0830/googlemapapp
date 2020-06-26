import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';


const InteractiveMap = withScriptjs(withGoogleMap(({ props, vehicles, styles }) => {
  
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 53.61753486, lng: 10.3454345 }}
        defaultOptions={{ styles: styles }}
      >
         { Object
            .keys(vehicles)
              .map((vehicle, key) => ( 
                    <Marker 
                      key={key}
                      position={{ 
                        lat: vehicles[key].geoCoordinate.latitude, 
                        lng: vehicles[key].geoCoordinate.longitude 
                      }}
                      onClick={() => { setSelectedVehicle(vehicles[key]); }}
                    />
                  )) 
          }

          { selectedVehicle && (
                <InfoWindow
                    defaultZoom={10}
                    position={{ 
                        lat: selectedVehicle.geoCoordinate.latitude, 
                        lng: selectedVehicle.geoCoordinate.longitude 
                      }}
                    onCloseClick={() => {
                            setSelectedVehicle(null);}}
                >
                  <div class="alert alert-dismissible alert-info">
                    <h4>{selectedVehicle.plate}</h4>
                    <h5>Feul Level: {selectedVehicle.fuelLevel}</h5>
                    <p><strong>Located @ </strong>{selectedVehicle.address}</p>
                  </div>
                </InfoWindow>
            )}
      </GoogleMap>
    )
}))

export default InteractiveMap;
