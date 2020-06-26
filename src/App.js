import React from 'react';

import AppWrapper  from './components/appWrapper';
import Navbar from './components/common/navBar';

import "bootswatch/dist/materia/bootstrap.min.css";
import './App.css';


function App() {
  return (
      <React.Fragment>
        <Navbar />
        <AppWrapper /> 
      </React.Fragment>
  );
}

export default App;
