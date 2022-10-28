import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/timeline">Timeline</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      
      <div className="footer">
        <Link to="" />
      </div>
    </>
  );
};

export default Layout;