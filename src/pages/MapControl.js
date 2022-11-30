import * as React from 'react';
import './MapControl.css';

class MapControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            desc: <div />,
            info: null,
            lineColor: 255,
            lineZIndex: 0
        };

        this.lines = [];

        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
    }

    createLine(from, to) {
        let newColor = this.state.lineColor - 8;
        
        if (this.lines.length > 0) {
            this.lines[this.lines.length - 1].setOptions({ strokeColor: `#${this.state.lineColor.toString(16)}0000` });
        }
        
        let line = new window.google.maps.Polyline({
            strokeColor: `#${newColor.toString(16)}0000`,
            strokeWeight: 2,
            geodesic: true,
            map: this.props.map,
            path: [from, to],
            zIndex: this.state.lineZIndex,
            icons: [{
                icon: {
                    path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW
                },
                repeat: "80px"
            }]
        });

        line.addListener("click", (e) => {
            this.state.info.setPosition(e.latLng);
            this.state.info.setMap(this.props.map);
            this.state.info.setContent("<span>" + from.kmTo(to).toFixed(2) + " miles</span>");
        });
        
        this.setState({ lineColor: newColor, lineZIndex: this.state.lineZIndex + 1 });

        return line;
    }

    componentDidUpdate() {
        if (this.props.map && this.props.markers && this.state.index === -1) {
            setTimeout(() => {
                this.props.map.setZoom(10);
            }, 1500);

            this.setState({ index: 0, desc: this.showMarker(0), info: new window.google.maps.InfoWindow({}) });
        }
    }

    showMarker(index) {
        let desc = null;
        const map = this.props.map;

        for (let i = 0; i < this.props.markers.length; i++) {
            const marker = this.props.markers[i];

            if (i === index) {
                marker.setMap(map);
                marker.setAnimation(window.google.maps.Animation.BOUNCE);

                const listener = map.addListener("idle", (e) => {
                    window.google.maps.event.removeListener(listener);

                    setTimeout(() => {
                        marker.setAnimation(null);
                    }, 1500);
                });

                map.panTo(marker.getPosition());
                desc = marker.desc;
            }
            else {
                marker.setMap(null);
            }
        }

        return desc;
    }

    leftClick() {
        if (this.props.map && this.props.markers && this.state.index > 0) {
            this.state.info.setMap(null);
            const desc = this.showMarker(this.state.index - 1);
            this.lines.pop().setMap(null);
            this.setState({ index: this.state.index - 1, desc: desc, lineZIndex: this.state.lineZIndex - 1, lineColor: this.state.lineColor + 8 });
        }
    }

    rightClick() {
        if (this.props.map && this.props.markers && this.state.index < this.props.markers.length - 1) {
            this.state.info.setMap(null);
            const desc = this.showMarker(this.state.index + 1);
            this.lines.push(this.createLine(this.props.markers[this.state.index].getPosition(), this.props.markers[this.state.index + 1].getPosition()));
            this.setState({ index: this.state.index + 1, desc: desc });
        }
    }

    render() {
        return (
            <div className="map-control">
                <div className="map-control-text">
                    {this.props.markers ? this.state.desc : <h2>Loading...</h2>}
                </div>
                <div>
                    {this.props.markers ? <button onClick={this.leftClick}>&lt; Previous</button> : null}
                    {this.props.markers ? <button onClick={this.rightClick}>Next &gt;</button> : null}
                </div>
            </div>
        );
    }
}

export default MapControl;
