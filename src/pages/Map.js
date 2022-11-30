import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './Map.css';
import axios, * as others from 'axios';

const baseUrl = "/api";

async function createMarker(desc, title, scripture, pos) {
    const marker = new window.google.maps.Marker({
        position: pos,
        title: title
    });
    
    let verses = [];
    
    if (scripture.book && scripture.chap && scripture.start && scripture.end) {
        let scripText = (await axios.get(`${baseUrl}/scripture/${scripture.book}/${scripture.chap}/${scripture.start}/${scripture.end}`)).data;
        verses = scripText.split("\n");
    }
    
    marker.desc = (
        <div>
            <h2>{title}</h2>
            <p>{desc}</p>
            <p className="scripture" style={{ fontWeight: "bold" }}>{scripture.display}</p>
            <div className="scripture-desc">
                {verses.map(x => <p className="scripture">{x}</p>)}
            </div>
        </div>
    );

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
    const [hasMarkers, setHasMarkers] = React.useState(false);

    if (!props.hasMarkers && !hasMarkers) {
        setHasMarkers(true);
        console.log("making markers");
        
        (async () => {
            let newMarkers = [
                await createMarker("Jesus was born here.", "Bethlehem", { display: "Luke 2:6-7", book: "luke", chap: 2, start: 6, end: 7 }, { lat: 31.7042957375591, lng: 35.20752958341698 }),
                await createMarker("Mary, Joseph, and the infant Jesus fled to Egypt to escape the slaughter of the infants.", "Egypt", { display: "Matthew 2:13-15", book: "matt", chap: 2, start: 13, end: 15 }, { lat: 31.201204507712475, lng: 29.918689404318005 }),
                await createMarker("Jesus was raised here.", "Nazareth", { display: "Matthew 2:19-23", book: "matt", chap: 2, start: 19, end: 23 }, { lat: 32.70067568884418, lng: 35.30343951920987 }),
                await createMarker("Jesus taught here when He was 12.", "Temple Mount", { display: "Luke 2:41-50", book: "luke", chap: 2, start: 41, end: 50 }, { lat: 31.778046839037163, lng: 35.23612007152828 }),
                await createMarker("Jesus was baptized here by John the Baptist, thus beginning His ministry.", "Bethabara", { display: "Matthew 3:13-17", book: "matt", chap: 3, start: 13, end: 17 }, { lat: 31.837031240644478, lng: 35.55003859986143 }),
                await createMarker("Cana is where Jesus performed His first public miracle, by turning water into wine.", "Cana", { display: "John 2:1-11", book: "john", chap: 2, start: 1, end: 11 }, { lat: 32.82687610363098, lng: 35.29881502938169 }),
                await createMarker("Jesus cleansed the temple here by casting out the money changers.", "Solomon's Porch", { display: "John 2:14-17", book: "john", chap: 2, start: 14, end: 17 }, { lat: 31.778046839037163, lng: 35.23612007152828 }),
                await createMarker("Jesus ministered here, and baptized many people.", "Judea", { display: "John 3:22", book: "john", chap: 3, start: 22, end: 22 }, { lat: 31.49673995940552, lng: 34.88429864537666 }),
                await createMarker("This is where Jesus had his famous interaction with the Samarian woman at the well.", "Samaria", { display: "John 4:4-42", book: "john", chap: 4, start: 4, end: 42 }, { lat: 32.35006158015438, lng: 35.16828744929716 }),
                await createMarker("Capernaum (and the surrounding area) is where Jesus did much preaching, performed many miracles, and called Simon, Peter, Andrew, James, and John to follow Him.", "Capernaum", { display: "Matthew 4:18-25", book: "matt", chap: 4, start: 18, end: 25 }, { lat: 32.884154953735326, lng: 35.57054901658668 }),
                await createMarker("Jesus gave The Sermon on the Mount somewhere in Galilee.", "Galilee", { display: "Matthew 5-7" }, { lat: 32.78985635617323, lng: 35.35712374163002 }),
                await createMarker("Jesus calmed this sea when the apostles begged Him to save them.", "Sea of Galilee", { display: "Mark 4:35-41", book: "mark", chap: 4, start: 35, end: 41 }, { lat: 32.79789655767118, lng: 35.586984160170864 }),
                await createMarker("Jesus fed the 5,000 near this town.", "Bethsaida", { display: "Matthew 14:16-21", book: "matt", chap: 14, start: 16, end: 21 }, { lat: 32.888749084395236, lng: 35.61413905078259 }),
                await createMarker("This may be the location of the Mount of Transfiguration, where the sealing keys of the Priesthood were committed to the apostles.", "Mount Hermon", { display: "Luke 9:28-36", book: "luke", chap: 9, start: 28, end: 36 }, { lat: 33.415420481805654, lng: 35.85656927998075 }),
                await createMarker("Jesus visted Mary and Martha in their home in this suburb of Jerusalem.", "Bethany", { display: "Luke 10:38-42", book: "luke", chap: 10, start: 38, end: 42 }, { lat: 31.74539824202355, lng: 35.247995617094105 }),
                await createMarker("Jesus told some of His most famous parables in the area nearby Jericho.", "Jericho", { display: "Luke 15" }, { lat: 31.855671812979484, lng: 35.461945458792805 }),
                await createMarker("Jesus gave some of His most powerful discourses here in the week leading up to His crucifixtion.", "Temple", { display: "Matthew 22" }, { lat: 31.778046839037163, lng: 35.23612007152828 }),
                await createMarker("This olive garden is where the Savior began to atone for our sins.", "Gethsemane", { display: "Mark 14:32-42", book: "mark", chap: 14, start: 32, end: 42 }, { lat: 31.779271661812313, lng: 35.23959007024514 }),
                await createMarker("Jesus was crucified and laid to rest, potentially in this location.", "Garden Tomb", { display: "John 19:38-42", book: "john", chap: 19, start: 38, end: 42 }, { lat: 31.78393023134462, lng: 35.23013256652359 }),
                await createMarker("In Galilee, the risen Christ appeared to His disciples and gave to them the Great Commission.", "Galilee", { display: "Matthew 28:16-20", book: "matt", chap: 28, start: 16, end: 20 }, { lat: 32.865659846127926, lng: 35.52099038811604 })
            ];
        
            props.changeMarkers(newMarkers);
        })();
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
        <div ref={ref} className="map-container" />
    );
};

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const wrapperRender = (status) => {
            return <h1 style={{ textAlign: "center", width: "100%" }}>{status}</h1>;
        };
        return (
            <Wrapper apiKey={"AIzaSyBFKFqqC3NanAH8ZxWVbjrGz7fOIi2iFTs"} render={wrapperRender}>
                <MapElement hasMarkers={this.props.oldMarkers !== null} changeMap={this.props.changeMap} changeMarkers={this.props.changeMarkers} />
            </Wrapper>
        );
    }
}

export default Map;
