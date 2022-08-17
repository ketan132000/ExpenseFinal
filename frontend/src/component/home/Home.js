import React from 'react';
import Header from '../header/Header';
import LowerHeader from '../lowerheader/LowerHeader';
import Navbar from '../navbar/Navbar';
import UpperHeader from '../upperheader/Upperheader';

let Home=()=>{
    
    return(
        <>
            <Navbar/>
            <UpperHeader/>
            <Header/>
            <LowerHeader/>
        </>

)};

export default Home;