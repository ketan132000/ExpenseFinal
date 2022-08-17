
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './mystyle.module.css';



let Login = () => {

    const [olmId, setOlmId] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    let [viewPassword, setViewPassword] = useState(false);


    let togglePasswordVisibility = () => {
        console.warn("view password");
        setViewPassword((prev) => {
            return !prev;
        });
    };

    let loginSubmit = async (e) => {
        console.warn("LOGIN SUCCESSFUL");
        // console.log(process.env.REACT_APP_API_URL);
        console.log(olmId, password);
        let result = await fetch('http://localhost:5000', {
            method: 'POST',
            body: JSON.stringify({ olmId, password }),
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>'
            }
        });
        result = await result.json();
        if (result.olmId === '39495' && result.password === 'welcome1') {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/dashboard");
        }

        else {
            alert("Wrong Credentials");
        }

    };


    return (

        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-7 px-0 d-none d-sm-block">

                        <img src="https://miro.medium.com/max/1400/0*eEGdj46kseSxB5HM.jpg"
                            alt="Login" className="w-100 vh-100 l_img" width={50} />
                    </div>
                    <div className="col-sm-5 text-black">
                        <div className="px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5 ">

                            <div className="pt-1 mb-4">
                                <img src="https://1000logos.net/wp-content/uploads/2018/01/Airtel-Logo.png" alt="airtel Logo" className='logo align-items-center' width={100} />
                            </div>


                        </div>
                        <div className='login'>
                            <label htmlFor="" className='input_text'>OLM ID</label>
                            <input type="text" className='inputbox input_box' placeholder='OLM ID' onChange={(e) => setOlmId(e.target.value)} value={olmId} />
                            <label htmlFor="" className='input_text'>PASSWORD</label>
                            <input type={viewPassword ? "text" : "password"} className='inputbox input_box' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />

                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                                onChange={togglePasswordVisibility}
                            />
                            <label className="custom-control-label text_log" htmlFor="customCheck1">
                                &nbsp; View Password
                            </label>
                            <button type='submit' className='inputbox btn btn-primary but' onClick={loginSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Login;