import React, { Fragment } from 'react';

const VehicleListItem = ({ plate, handleClick, event }) => {
    return (
        <Fragment>
        	<button type="button" className="btn btn-outline-info m-2" onClick={(event) => handleClick}>{ plate }</button>
        </Fragment>
    );
};
export default VehicleListItem;
