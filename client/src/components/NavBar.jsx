import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <div className='mainNavBar' >
            <Link to="/">INICIO</Link>
            <Link to="/home">HOME</Link>
            <Link to="/recipes">FORM</Link>
            <Link to="/aboutme">ABOUT ME</Link>
        </div>
    )
}

export default NavBar;