import { NavLink } from "react-router-dom";
import '../styles/NavbarStyles.css';

const Navbar = ({ isHome }) => {
    return (
        <div className="navbar">
            <NavLink className="navbar-link" to="/">Movies4U</NavLink>
        </div>
    );
};

export default Navbar;