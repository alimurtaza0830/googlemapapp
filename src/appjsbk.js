import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

import { getVehicles } from './services/fakeVehicleService';
import VehicleListItem  from './components/vehicleListItem';
import Navbar from './components/common/navBar';

import  { apiKey }  from './config.json';
import { mapStyles } from './mapStyles';

import "bootswatch/dist/materia/bootstrap.min.css";
import './App.css';


function App() {

  const [vehicles, setVehicles] = useState([]);
  
  // fetch vehicle from service
  useEffect(() => {
    async function fetchData() {
    const vehicles = await getVehicles();
    setVehicles(vehicles);
  }
  fetchData();
  }, []);
  
  // state hook for selected vehicle on map...
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [defaultVehicle, setDefaultVehicle] = useState({
        lat: 53.63382777, lng: 10.0071494
  });

  const zoomToVehicle = (event, key) => {
    console.log(event)
    // setDefaultVehicle({
    //   lat: vehicles[key].geoCoordinate.latitude, 
    //   lng: vehicles[key].geoCoordinate.longitude 
    // })
  }

  // spopulate list of vehicles
  const vehiclesList = Object.keys(vehicles).map((key, index) => { 
                    return <VehicleListItem 
                      key={key}
                      plate={vehicles[key].plate}
                      handleClick={zoomToVehicle()} />
                  });

  function Map() {
      return (
          <GoogleMap
            defaultZoom={10} 
            defaultCenter={{ lat: defaultVehicle.lat, lng: defaultVehicle.lng }}
            defaultOptions={{ styles: mapStyles }}
          >
            { Object.keys(vehicles).map((vehicle, key) => ( 
                        <Marker 
                          key={key}
                          position={{ 
                            lat: vehicles[key].geoCoordinate.latitude, 
                            lng: vehicles[key].geoCoordinate.longitude 
                          }} 
                          onClick={() => {
                            setSelectedVehicle(vehicles[key]);
                          }}
                        />
                      )) }


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
        );
    }
    const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
      <Fragment>
      <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5" 
              style={{ height: `100vh`, 
                      'overflow-y': 'auto', 
                      'display': 'grid',
                      'grid-template-columns': `repeat(5, 1fr)`
                    }}>
              { vehiclesList }
            </div>
            <div className="col-md-7">
              <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
