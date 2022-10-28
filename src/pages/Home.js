import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>In His Footsteps</h1>
            <p>Follow the Savior, Jesus Christ, through several of the most important events of His earthly ministry.</p>
            <Link to="/map">View the Interactive Map</Link>
            <Link to="/timeline">See a Simplified Timeline</Link>
        </div>
    );
};

export default Home;