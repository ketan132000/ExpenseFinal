import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Claim = (props) => {

  let olm = localStorage.getItem("user");
  olm = JSON.parse(olm);

  let navigate = useNavigate();

  let newexpense = async (e) => {
    e.preventDefault();
    let { olmid, invoice, date, amount, description } = e.target.elements;
    console.warn("EXPENSE MADE");
    let a_amount = amount.value;
    let a_invoice = invoice.value;
    let a_date = date.value;
    let a_olmId = olmid.value;
    let a_description = description.value;
    console.log({ olmid: a_olmId, invoice: a_invoice, date: a_date, amount: a_amount, description: a_description })



    let api_result = await fetch('http://localhost:5000/newclaim', {
      method: 'POST',
      body: JSON.stringify({ a_amount, a_invoice, a_date, a_olmId, a_description }),
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '<calculated when request is sent>'
      }
    });

    console.warn(api_result.status);
    if(api_result.status === 201){
      alert("Expense Made");
      props.handleClose();
    }
    else if(api_result.status === 400){
      alert("Invalid Expenses");
    }
    else{
      alert("Duplicate Expense");
    }
  };


  
  const disableFutureDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };


  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h3 className="expenseform_center">MAKE A CLAIM</h3>
        <form onSubmit={newexpense}>
          <label htmlFor="" className="expenseform_text">OLM ID</label>
          <input type="text" id="olmid" value={olm.olmId} placeholder="OLM ID" className="expenseform" readOnly />

          <label htmlFor="" className="expenseform_text">Invoice Number <span className="asterisk"> *</span></label>
          <input type="text" id="invoice" placeholder="Invoice" className="expenseform" required onInvalid={(e) => { e.target.setCustomValidity('Enter Invoice Number') }} onChange={(e) => { e.target.setCustomValidity('') }} />

          <label htmlFor="" className="expenseform_text">Date<span className="asterisk"> *</span></label>
          <input type="date" id="date" placeholder="Date" className="expenseform" required onInvalid={(e) => { e.target.setCustomValidity('Enter Expense Date') }} onChange={(e) => { e.target.setCustomValidity('') }} max={disableFutureDate()} onKeyDown={(e) => {
            e.preventDefault();
       }} />

          <label htmlFor="" className="expenseform_text">Amount in ₹<span className="asterisk"> *</span></label>
          <input type="number" id="amount" placeholder="Amount" className="expenseform" min ={0} max={100000} required onInvalid={(e) => { e.target.setCustomValidity('Enter Expense Amount') }} onChange={(e) => { e.target.setCustomValidity('') }} />

          <label htmlFor="" className="expenseform_text">Description</label>
          <input type="text" id="description" placeholder="Description" className="expenseform" />
          <button type="submit" className="btn btn-sm btn-secondary expenseform_btn">NEW CLAIM</button>
        </form>
      </div>
    </div>
  );
};

export default Claim;
