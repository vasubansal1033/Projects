import React from 'react';
import Logo from '../logo.png';
import {Link} from 'react-router-dom';

function NavBar()  {    
    return (
        <div className="border pl-12 py-4 flex space-x-8 items-center">
            <img className="w-[50px] md:w-[80px]" src={Logo}></img>
            {/* <div className="text-blue-400 font-bold text-xl md:text-3xl">Movies</div>
            <div className="text-blue-400 font-bold text-xl md:text-3xl">Favorites</div> */}
            <Link to="/" className="text-blue-400 font-bold text-xl md:text-3xl">Movies</Link>
            <Link to="/favorites" className="text-blue-400 font-bold text-xl md:text-3xl">Favorites</Link>
        </div>
    );    
}

export default NavBar;

