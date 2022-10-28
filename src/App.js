import logo from './logo.svg';
import './App.css';
import Map from './pages/Map.js';
import MapControl from './pages/MapControl.js';
import Layout from './pages/Layout.js';
import NotFound from './pages/NotFound.js';
import Home from './pages/Home.js';
import Timeline from './pages/Timeline.js';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null
    };
    
    this.setMap = this.setMap.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
  }
  
  setMap(map) {
    this.setState({ map: map });
  }
  
  setMarkers(markers) {
    this.setState({ markers: markers });
  }
  
  render() {
    return (
      <BrowserRouter basename="/rel250-project/build">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="map" element={<div style={{display: "flex", flexGrow: "1"}}><MapControl map={this.state.map} markers={this.state.markers} /><Map changeMap={this.setMap} changeMarkers={this.setMarkers} /></div>} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
