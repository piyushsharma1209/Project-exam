import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.css';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <Link className="logo" to="/">HoliDaze</Link>

            <button className="menu-icon" onClick={toggleDropdown}>
                {isOpen ? 'Close' : 'Menu'}
            </button>

            {isOpen && (
                <div className="dropdown">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" onClick={closeDropdown}>Profile</Link>
                            <Link to="/" onClick={() => {
                                closeDropdown();
                                handleLogout();
                            }}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeDropdown}>Login</Link>
                            <Link to="/register" onClick={closeDropdown}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
