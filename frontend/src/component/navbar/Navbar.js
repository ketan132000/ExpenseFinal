import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,DropdownButton,Dropdown } from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';

let Navbar = () => {

    const navigate=useNavigate();
    let logout = () => {
        console.warn("LOGOUT");
        localStorage.clear();
        navigate('/');
    };


    return (

        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://1000logos.net/wp-content/uploads/2018/01/Airtel-Logo.png" alt="" width={70} />
                    </a>
                    <DropdownButton  id="dropdown-basic-button" title="⚙️">
                        <Dropdown.Item >Your Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                    </DropdownButton>

                </div>
            </nav>

        </div>

    );
};

export default Navbar;