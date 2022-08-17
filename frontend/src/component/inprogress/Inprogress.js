import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import UpperHeader from '../upperheader/Upperheader';
import Header from '../header/Header';
import LowerHeader from '../lowerheader/LowerHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Claim from '../claim/Claim';
import EditExpense from '../editexpense/EditExpense';


let Inprogress = () => {

    const [id,setId]=useState('');
    const [inprogress, setInprogress] = useState([]);
    const [amount,setAmount]=useState(0);
    const [date,setDate]=useState('');
    const [invoice,setInvoice]=useState('');
    const  [description,setDescription]=useState('');

    useEffect(() => {
        getExpense();
    }, [])

    const getExpense = async () => {
        let result = await fetch('http://localhost:5000/inprogress');
        result = await result.json();
        setInprogress(result);
    }


    const deleteExpense = async(id)=>{
        console.warn(id);
        let result= await fetch(`http://localhost:5000/inprogress/${id}`,{
            method:'DELETE'
        });
        result=await result.json();
        if(result)
        {
            alert('Expense Deleted');
            getExpense();
        }
    }

    const editExpense=(id,a_amount,a_date,a_description,a_invoice)=>{
        setAmount(a_amount);
        setDate(a_date);
        setInvoice(a_invoice);
        setDescription(a_description);
        setId(id);
        // console.warn(id,a_amount,a_date,a_description,a_invoice);
    }





    // console.warn("INPROGRESS",inprogress);



    const [isOpen, setIsOpen] = useState(false);
    const[expenseId,setExpenseId]=useState();

    const togglePopup = () => {
        // setExpenseId(id);
        // console.log(expenseId);
        setIsOpen(!isOpen);
        
        
    }

    return (
        <>
            <Navbar />
            <UpperHeader />
            <Header />
            <LowerHeader />


            <style>
                {`
                        .table{
                            color:white;
                            font-weight:500;
                        }
                        .link_a{
                            all:unset;
                         }
                
                `}
            </style>
            <div className='inprogress-list table-responsive'>
                {/* <h3>EXPENSE IN-PROGRESS</h3> */}
                <table className="table  table-striped">
                    <thead className="tab-head">
                        <tr>
                            <th scope="col">S.NO</th>
                            <th scope="col">Invoice No</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            
                        </tr>
                    </thead>
                    {

                    inprogress.map((expense,index)=>
                    <tbody>
                        <tr className='row-body'>
                            <th scope="row" onClick={togglePopup}>{index+1}</th>
                            <td onClick={()=>{togglePopup();editExpense(expense._id,expense.a_amount,expense.a_date,expense.a_description,expense.a_invoice)}}>{expense.a_invoice}</td>
                            <td  onClick={()=>{togglePopup();editExpense(expense._id,expense.a_amount,expense.a_date,expense.a_description,expense.a_invoice)}}>₹{expense.a_amount}</td>
                            <td onClick={()=>{togglePopup();editExpense(expense._id,expense.a_amount,expense.a_date,expense.a_description,expense.a_invoice)}}>{(expense.a_date).slice(0,10)}</td>
                            <td onClick={()=>{togglePopup();editExpense(expense._id,expense.a_amount,expense.a_date,expense.a_description,expense.a_invoice)}}>{expense.a_description}</td>
                            <td className='status-text'  onClick={()=>{togglePopup();editExpense(expense._id,expense.a_amount,expense.a_date,expense.a_description,expense.a_invoice)}}>{expense.a_status}</td>
                            <td><img src="https://cdn-icons-png.flaticon.com/128/7265/7265328.png" alt="" width={25} className="delete-icon" onClick={()=>{deleteExpense(expense._id)}}/></td>
                        </tr>
                    </tbody>

                    )}
                </table>
                </div>

                <div className='container-fluid cont'>
                {isOpen && <EditExpense
                                handleClose={togglePopup}
                                amount={amount} date={date}
                                invoice={invoice} description={description} id={id} getExpense={getExpense}
                />}
                </div>
            
        </>

    )
};


export default Inprogress;