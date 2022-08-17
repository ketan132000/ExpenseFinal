// import styles from "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/Navbar';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import UpperHeader from '../upperheader/Upperheader';
import Header from '../header/Header';
import LowerHeader from '../lowerheader/LowerHeader';
import Claim from '../claim/Claim';

import React from 'react';
import {useState} from 'react';

let Dashboard = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    let newclaim = () => {
        navigate('/newClaim');
    }
    let approvedclaim = () => {
        navigate('/approvedClaim');
    }
    let progressclaim = () => {
        navigate('/inprogress');
    }
    return (

        <>
            <Navbar />
            <UpperHeader />
            <Header />
            <LowerHeader />
            <style>
                {`
                
                body{
                    background-color:white;
                }
                .cont{
                    color: #646464;
                    margin-top:1rem;
                    background-color:#dde0e1;
                    font-weight:700;
                   
                
                }
                .col1{
                    padding:10rem 2rem;
                    border-right: 1px solid white;
                }
                .note{
                    text-align: initial;
                    font-family: raleway;
                    font-size: large;
                    
                }
                .card_w{

                    font-style: oblique;
                    margin-top: 2rem;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 0.5rem;
                    width: 15rem;
                    align-items: center;
                    font-family: inherit;
                    box-shadow: 3px 3px 3px #c1bdbd;
                }
                .card-img-top{
                    padding-top:1rem;
                    width:20%!important;
                }
                .row{
                    padding-top:1rem;
                }

                .card:hover{
                    // border: 20px gainsboro;
                    // background-color: green;
                    // opacity: 100%;
                    cursor:pointer;
                    transform: scale(1.1);
                    box-shadow: 3px 3px 3px #c1bdbd;
                 }

                 .link_a{
                    all:unset;
                 }
               
            `}
            </style>

            <div className="container-fluid cont">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6 col1">
                        <p className="note">Note: Falsifying expenses will result in your immediate repayment of the reimbursed claim, liable for appropriate disciplinary actions and will be directed to your manager for approval.</p>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-6" >
                        <div className="row">

                            <div className="card card_w" onClick={togglePopup} >

                                <img src="https://cdn-icons-png.flaticon.com/512/7641/7641614.png" className="card-img-top" alt="..." href="#" />

                                <div className="card-body" >
                                    <h5 className="card-title">Make a Claim</h5>
                                    <p className="card-text"></p>
                                </div>
                            </div>

                            {isOpen && <Claim
                                handleClose={togglePopup}
                            />}

                            <div className="card card_w" onClick={approvedclaim}>
                                <img src="https://cdn-icons.flaticon.com/png/128/5290/premium/5290081.png?token=exp=1658851871~hmac=1d94f4e6e804dfddb23b9acce7a5e3ba" className="card-img-top" alt="..."  />
                                <div className="card-body">
                                    <h5 className="card-title">Claims Approved</h5>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="card card_w" >
                                <img src="https://cdn-icons-png.flaticon.com/128/463/463612.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Claims Rejected</h5>
                                    <p className="card-text"></p>
                                </div>
                            </div>

                            <div className="card card_w" onClick={progressclaim} >
                                <img src="https://pic.onlinewebfonts.com/svg/thumbnails_60_17874.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Claims In-progress</h5>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};


export default Dashboard;
