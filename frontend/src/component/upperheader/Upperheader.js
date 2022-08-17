import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';

let UpperHeader = () =>{

    const navigate=useNavigate();
    let home=()=>{
        console.warn("HOME CLICKED");
        navigate('/dashboard');
    }

    return (

        <div className='topheader'>

        <div className="topmyDivElement">
            <ul>
                <li onClick={home}>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>

    </div>
            
    );
};

export default UpperHeader;