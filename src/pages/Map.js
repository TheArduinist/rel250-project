import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './Map.css';

function createMarker(desc, title, scripture, pos) {
    const marker = new window.google.maps.Marker({
        position: pos,
        title: title
    });

    marker.desc = <div><h2>{title}</h2><p>{desc}</p><p className="scripture">{scripture}</p></div>;

    return marker;
}

const MapElement = function(props) {
    window.google.maps.LatLng.prototype.kmTo = function(a) {
        var e = Math,
            ra = e.PI / 180;
        var b = this.lat() * ra,
            c = a.lat() * ra,
            d = b - c;
        var g = this.lng() * ra - a.lng() * ra;
        var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d / 2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g / 2), 2)));
        return f * /*6378.137*/3958.76;
    };

    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    const [markers, setMarkers] = React.useState(null);

    if (!markers) {
        let newMarkers = [
            createMarker("Jesus was born here.", "Bethlehem", "Luke 2:6-7", { lat: 31.7042957375591, lng: 35.20752958341698 }),
            createMarker("Mary, Joseph, and the infant Jesus fled to Egypt to escape the slaughter of the infants.", "Egypt", "Matthew 2:13-15", { lat: 31.201204507712475, lng: 29.918689404318005 }),
            createMarker("Jesus was raised here.", "Nazareth", "Matthew 2:19-23", { lat: 32.70067568884418, lng: 35.30343951920987 }),
            createMarker("Jesus taught here when He was 12.", "Temple Mount", "Luke 2:41-50", { lat: 31.778046839037163, lng: 35.23612007152828 }),
            createMarker("Jesus was baptized here by John the Baptist, thus beginning His ministry.", "Bethabara", "Matthew 3:13-17", { lat: 31.837031240644478, lng: 35.55003859986143 }),
            createMarker("Cana is where Jesus performed His first public miracle, by turning water into wine.", "Cana", "John 2:1-11", { lat: 32.82687610363098, lng: 35.29881502938169 }),
            createMarker("Jesus cleansed the temple here by casting out the money changers.", "Solomon's Porch", "John 2:14-17", { lat: 31.778046839037163, lng: 35.23612007152828 }),
            createMarker("Jesus ministered here, and baptized many people.", "Judea", "John 3:22", { lat: 31.49673995940552, lng: 34.88429864537666 }),
            createMarker("This is where Jesus had his famous interaction with the Samarian woman at the well.", "Samaria", "John 4:4-42", { lat: 32.35006158015438, lng: 35.16828744929716 }),
            createMarker("Capernaum (and the surrounding area) is where Jesus did much preaching, performed many miracles, and called Simon, Peter, Andrew, James, and John to follow Him.", "Capernaum", "Matthew 4:18-25", { lat: 32.884154953735326, lng: 35.57054901658668 }),
            createMarker("Jesus gave The Sermon on the Mount somewhere in Galilee.", "Galilee", "Matthew 5-7", { lat: 32.78985635617323, lng: 35.35712374163002 }),
            createMarker("Jesus calmed this sea when the apostles begged Him to save them.", "Sea of Galilee", "Mark 4:35-41", { lat: 32.79789655767118, lng: 35.586984160170864 }),
            createMarker("Jesus fed the 5,000 near this town.", "Bethsaida", "Matthew 14:16-21", { lat: 32.888749084395236, lng: 35.61413905078259 }),
            createMarker("This may be the location of the Mount of Transfiguration, where the sealing keys of the Priesthood were committed to the apostles.", "Mount Hermon", "Luke 9:28-36", { lat: 33.415420481805654, lng: 35.85656927998075 }),
            createMarker("Jesus visted Mary and Martha in their home in this suburb of Jerusalem.", "Bethany", "Luke 10:38-42", { lat: 31.74539824202355, lng: 35.247995617094105 }),
            createMarker("Jesus told some of His most famous parables in the area nearby Jericho.", "Jericho", "Luke 15", { lat: 31.855671812979484, lng: 35.461945458792805 }),
            createMarker("Jesus gave some of His most powerful discourses here in the week leading up to His crucifixtion.", "Temple", "Matthew 22", { lat: 31.778046839037163, lng: 35.23612007152828 }),
            createMarker("This olive garden is where the Savior began to atone for our sins.", "Gethsemane", "Mark 14:32-42", { lat: 31.779271661812313, lng: 35.23959007024514 }),
            createMarker("Jesus was crucified and laid to rest, potentially in this location.", "Garden Tomb", "John 19:38-42", { lat: 31.78393023134462, lng: 35.23013256652359 }),
            createMarker("In Galilee, the risen Christ appeared to His disciples and gave to them the Great Commission.", "Galilee", "Matthew 28:16-20", { lat: 32.865659846127926, lng: 35.52099038811604 }),
        ];

        setMarkers(newMarkers);
        props.changeMarkers(newMarkers);
    }

    const ops = {
        center: { lat: 31.76849, lng: 35.20483 },
        zoom: 8,
        gestureHandling: "greedy",
        panControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        restriction: {
            latLngBounds: {
                north: 35,
                south: 28,
                east: 40,
                west: 25
            },
            strictBounds: true
        },
        styles: [{"featureType":"administrative.country","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"off"}]},{"featureType":"road","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}]
    };

    React.useEffect(() => {
        if (ref.current && !map) {
            let newMap = new window.google.maps.Map(ref.current, ops);
            setMap(newMap);
            props.changeMap(newMap);
        }
    }, [ref, map]);

    return (
        <div ref={ref} style={{ height: "100%", width: "67vw"}} />
    );
};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeMap: props.changeMap,
            changeMarkers: props.changeMarkers
        };
    }

    render() {
        const wrapperRender = (status) => {
            return <h1>{status}</h1>;
        };
        return (
            <Wrapper apiKey={"AIzaSyBFKFqqC3NanAH8ZxWVbjrGz7fOIi2iFTs"} render={wrapperRender}>
                <MapElement changeMap={this.state.changeMap} changeMarkers={this.state.changeMarkers} />
            </Wrapper>
        );
    }
}

export default Map;
