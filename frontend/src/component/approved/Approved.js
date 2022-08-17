import React from "react";
import Navbar from '../navbar/Navbar';
import UpperHeader from '../upperheader/Upperheader';
import Header from '../header/Header';
import LowerHeader from '../lowerheader/LowerHeader';

let Approved=()=>{
    return(
        <>
           <Navbar/>
            <UpperHeader/>
            <Header/>
            <LowerHeader/>
            <div className="approved">
                {/* <h3>NO EXPENSE APPROVED</h3> */}
                <img src="https://cdn-icons-png.flaticon.com/128/7486/7486754.png" alt="" />
            </div>
        </> 
        
    )
};

export default Approved;