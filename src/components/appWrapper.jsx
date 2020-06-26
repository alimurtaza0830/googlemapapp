import React, { Fragment, useState, useEffect } from 'react';

import { getVehicles } from './../services/fakeVehicleService';
import VehicleListItem  from './vehicleListItem';
import InteractiveMap  from './interactiveMap';


import  { apiKey }  from './../config.json';
import { mapStyles } from './../mapStyles';


const AppWrapper = () => {

  const [vehicles, setVehicles] = useState([]);
  // fetch vehicle from service
  useEffect(() => {
    async function fetchData() {
    const vehicles = await getVehicles();
    setVehicles(vehicles);
  }
  fetchData();
  }, []);
  

  // populate list of vehicles
  const vehiclesList = Object.keys(vehicles).map((key, index) => { 
                    return <VehicleListItem 
                      key={key}
                      plate={vehicles[key].plate}
                      />
                  });
  return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 list-items-container">
              { vehiclesList }
            </div>
            <div className="col-md-7">
              <InteractiveMap
                vehicles={vehicles}
                styles={mapStyles} 
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

export default AppWrapper;
