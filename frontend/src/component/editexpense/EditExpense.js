import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const EditExpense = (props) => {

  
  let navigate=useNavigate();
  let olm=localStorage.getItem('user');
  olm = JSON.parse(olm);
  // console.log(olm.olmId);
  const [id,setId]=useState(props.id);
  const [amount,setAmount]=useState(props.amount);
  const [date,setDate]=useState(props.date.slice(0,10));
  const [invoice,setInvoice]=useState(props.invoice);
  const  [description,setDescription]=useState(props.description);

  const editclaim=async(e)=>{
    e.preventDefault();
    let result = await fetch(`http://localhost:5000/edit/${id}`,{
      method:'POST',
      body:JSON.stringify({amount,date,invoice,description}),
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '<calculated when request is sent>'
      }
    });
    result = await result.json();
    console.warn(result);
    // if(result.status === 201)
    // {
    //   alert('Working');
    // }
    props.handleClose();
    props.getExpense();
  }
  
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
        <span className="close-iconn" onClick={props.handleClose}>x</span>
        {/* <h3 className="expenseform_center">EDIT CLAIM</h3> */}
        <form onSubmit={editclaim}>
          <label htmlFor="" className="expenseform_text">OLM ID</label>
          <input type="text" value={olm.olmId} id="olmid" placeholder="OLM ID" className="expenseform" readOnly/>

          <label htmlFor="" className="expenseform_text">Invoice Number <span className="asterisk"> *</span></label>
          <input type="text" id="invoice" value={invoice} placeholder="Invoice" className="expenseform" required onInvalid={(e) => { e.target.setCustomValidity('Enter Invoice Number') }} onChange={(e) => { e.target.setCustomValidity(''); setInvoice(e.target.value); }}/>

          <label htmlFor="" className="expenseform_text">Date<span className="asterisk"> *</span></label>
          <input type="date" id="date" value={date} placeholder="Date" className="expenseform" required onInvalid={(e) => { e.target.setCustomValidity('Enter Expense Date') }} onChange={(e) => { e.target.setCustomValidity('');setDate(e.target.value); }} max={disableFutureDate()} onKeyDown={(e) => {
            e.preventDefault();
       }} />

          <label htmlFor="" className="expenseform_text">Amount in ₹<span className="asterisk"> *</span></label>
          <input type="number" id="amount" value={amount} placeholder="Amount" className="expenseform" min ={0} max={100000} required onInvalid={(e) => { e.target.setCustomValidity('Enter Expense Amount') }} onChange={(e) => { e.target.setCustomValidity(''); setAmount(e.target.value); }} />

          <label htmlFor="" className="expenseform_text">Description</label>
          <input type="text" id="description" value={description} placeholder="Description" className="expenseform" onChange={(e)=>setDescription(e.target.value)} />
          <button type="submit" className="btn btn-sm btn-secondary expenseform_btn">EDIT CLAIM</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
