import logo from './logo.png';
import './App.css';
import React from 'react';

function App() {
  const [isBruh, setIsBruh] = React.useState("false")
  return (
    <div className="App">
      <h3> Bruhify contents </h3>
      <label className="switch">
        <input typeName="checkbox"/>
        <span className="slider round"></span>
        </label>
     
    </div>
  );
}

export default App;
