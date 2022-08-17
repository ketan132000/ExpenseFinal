const express=require('express');
var bodyParser = require('body-parser');
const cors=require('cors');
const app=express();
const axios=require('axios');
let mongoose = require("mongoose");
// let db = require('./db/config');

mongoose.connect("mongodb://localhost:27017/Expense",{
    useNewUrlParser: true, useUnifiedTopology:true
},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Successfully Connected");
    }
});

// let employeeModel = require("./db/employee_model");
let Claims=require('./db/Claims');


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT=5000;




//LOGIN API
app.post('/',(req,res)=>{
    console.log("LOGIN SUBMIT");
    console.log(req.body);
    let result=JSON.stringify(req.body);
    res.send(req.body);
});


app.post('/edit/:id',async(req,res)=>{
    console.log(req.body);
    let t = await Claims.findOne({
        a_invoice: req.body.invoice,
        a_date: req.body.date,
       a_amount: req.body.amount,
    //    a_description:req.body.description,
    });
    if (t) {
        res.status(409).json({
            message:
                "Expense Already Present",
        });
        return;
    }

    let post_url="https://eeji-test.fa.em3.oraclecloud.com:443/fscmRestApi/resources/11.13.18.05/expenses";
   
    let post_body={
            Location:"India",
            Description: req.body.description,
            ReceiptDate: req.body.date,
            ExpenseTemplateId: 300000726874148,
            ReceiptAmount:req.body.amount
    };

    let USERNAME='39495';
    let PASSWORD="welcome1";


    await axios.post(post_url,post_body,{
        auth: {username:USERNAME,password:PASSWORD},
    }).then((response)=>{
        res.send(response.data);
        console.log(response);
    }).catch(function (error) {
        res.sendStatus (error.toJSON().status);
        return;
    });
    const result = await Claims.findOneAndUpdate({_id:req.params.id},{ $set: {a_amount:req.body.amount, a_date:req.body.date, a_invoice:req.body.invoice, a_description:req.body.description}});
    // console.log(result);
    // res.send(result);
});


app.delete('/inprogress/:id',async(req,res)=>{
    
    const result = await Claims.deleteOne({_id:req.params.id})
    res.send(result);
})

app.get('/inprogress/:id',async(req,res)=>{
    const result=await Claims.findOne({_id:req.params.id});
    if(result)
    {
     res.send(result);
    }
    else{
        res.send({result:'NO RESULT FOUND'});
    }
})

//IN-PROGRESS LIST API

app.get('/inprogress',async(req,res)=>{
    let db_data=await Claims.find().sort({ a_date: -1 });
    if(db_data.length>0)
    {
        res.send(db_data);
    }
    else{
    res.send({db_data:"NO CLAIM INPROGRESS"});
    }
});






//NEW CLAIM API

app.post('/newclaim',async(req,res)=>{
    
    console.log(req.body);

    let t = await Claims.findOne({
        a_invoice: req.body.a_invoice,
        a_date: req.body.a_date,
       a_amount: req.body.a_amount,
    });
    if (t) {
        res.status(409).json({
            message:
                "Duplicate Invoice",
        });
        return;
    }
    let post_url="https://eeji-test.fa.em3.oraclecloud.com:443/fscmRestApi/resources/11.13.18.05/expenses";
   
    let post_body={
            Location:"India",
            Description: req.body.a_description,
            ReceiptDate: req.body.a_date,
            ExpenseTemplateId: 300000726874148,
            ReceiptAmount:req.body.a_amount
    };

    let USERNAME='39495';
    let PASSWORD="welcome1";



    let claim=new Claims(req.body);



   claim.save(function (err) {
        if (err) return console.error(err);
        console.log ("DB UPDATED");
      });

    await axios.post(post_url,post_body,{
        auth: {username:USERNAME,password:PASSWORD},
    }).then((response)=>{
        res.sendStatus(response.status);
    }).catch(function (error) {
        res.sendStatus (error.toJSON().status);
    });

    
});




//APP START
app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
});
